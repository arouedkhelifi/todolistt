cat > scripts/smoke-tests. sh << 'EOF'
#!/bin/bash

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SMOKE_LOG="smoke_test_${TIMESTAMP}.log"
PASSED=0
FAILED=0

echo "======================================"
echo "🧪 DÉMARRAGE DES SMOKE TESTS"
echo "======================================"
echo "Timestamp: $TIMESTAMP" | tee $SMOKE_LOG

# Attendre que les services démarrent
echo ""
echo "⏳ Attente du démarrage des services (15s)..." | tee -a $SMOKE_LOG
sleep 15

# Test 1 : Backend Health Check
echo ""
echo "🔍 Test 1: Backend Health Check" | tee -a $SMOKE_LOG
if curl -s http://localhost:5000/health > /dev/null 2>&1 || curl -s http://localhost:5000 > /dev/null 2>&1; then
  echo "✅ PASSED: Backend is responding on port 5000" | tee -a $SMOKE_LOG
  ((PASSED++))
else
  echo "❌ FAILED: Backend is not responding" | tee -a $SMOKE_LOG
  ((FAILED++))
fi

# Test 2 : Frontend Health Check
echo ""
echo "🔍 Test 2: Frontend Health Check" | tee -a $SMOKE_LOG
if curl -s http://localhost:3000 > /dev/null 2>&1; then
  echo "✅ PASSED: Frontend is responding on port 3000" | tee -a $SMOKE_LOG
  ((PASSED++))
else
  echo "❌ FAILED: Frontend is not responding" | tee -a $SMOKE_LOG
  ((FAILED++))
fi

# Test 3 : MongoDB Connection
echo ""
echo "🔍 Test 3: MongoDB Connection" | tee -a $SMOKE_LOG
if docker exec todolistt-mongodb mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
  echo "✅ PASSED: MongoDB is accessible" | tee -a $SMOKE_LOG
  ((PASSED++))
else
  echo "❌ FAILED: MongoDB is not accessible" | tee -a $SMOKE_LOG
  ((FAILED++))
fi

# Test 4 : Docker Network Connectivity
echo ""
echo "🔍 Test 4: Docker Network Connectivity" | tee -a $SMOKE_LOG
if docker network inspect todolistt-network > /dev/null 2>&1; then
  echo "✅ PASSED: Docker network exists and is healthy" | tee -a $SMOKE_LOG
  ((PASSED++))
else
  echo "❌ FAILED: Docker network not found" | tee -a $SMOKE_LOG
  ((FAILED++))
fi

# Test 5 : Container Status Check
echo ""
echo "🔍 Test 5: Container Status Check" | tee -a $SMOKE_LOG
BACKEND_STATUS=$(docker ps --filter "name=todolistt-backend" --format "{{.State}}" 2>/dev/null || echo "not-found")
FRONTEND_STATUS=$(docker ps --filter "name=todolistt-frontend" --format "{{.State}}" 2>/dev/null || echo "not-found")
MONGODB_STATUS=$(docker ps --filter "name=todolistt-mongodb" --format "{{.State}}" 2>/dev/null || echo "not-found")

if [ "$BACKEND_STATUS" = "running" ] && [ "$FRONTEND_STATUS" = "running" ] && [ "$MONGODB_STATUS" = "running" ]; then
  echo "✅ PASSED: All containers are running" | tee -a $SMOKE_LOG
  ((PASSED++))
else
  echo "❌ FAILED: Some containers are not running" | tee -a $SMOKE_LOG
  echo "   Backend: $BACKEND_STATUS | Frontend: $FRONTEND_STATUS | MongoDB: $MONGODB_STATUS" | tee -a $SMOKE_LOG
  ((FAILED++))
fi

# Test 6 : Docker Images Verification
echo ""
echo "🔍 Test 6: Docker Images Verification" | tee -a $SMOKE_LOG
if docker images | grep -q "todolistt-backend" && docker images | grep -q "todolistt-frontend"; then
  echo "✅ PASSED: Both Docker images built successfully" | tee -a $SMOKE_LOG
  ((PASSED++))
else
  echo "❌ FAILED: Docker images not found" | tee -a $SMOKE_LOG
  ((FAILED++))
fi

# Résumé
echo ""
echo "======================================"
echo "📊 RÉSUMÉ DES TESTS"
echo "======================================"
echo "Tests Passés: $PASSED/6" | tee -a $SMOKE_LOG
echo "Tests Échoués: $FAILED/6" | tee -a $SMOKE_LOG
echo ""
echo "Log file: $SMOKE_LOG" | tee -a $SMOKE_LOG

if [ $FAILED -eq 0 ]; then
  echo ""
  echo "✅ TOUS LES TESTS PASSED" | tee -a $SMOKE_LOG
  exit 0
else
  echo ""
  echo "❌ CERTAINS TESTS ONT FAILED" | tee -a $SMOKE_LOG
  exit 1
fi
EOF
chmod +x scripts/smoke-tests.sh