cat > scripts/build.sh << 'EOF'
#!/bin/bash

set -e

PROJECT_NAME="todolistt"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="build_${TIMESTAMP}.log"

echo "======================================"
echo "🔨 DÉMARRAGE DU BUILD"
echo "======================================"
echo "Timestamp: $TIMESTAMP" | tee $LOG_FILE
echo "Project: $PROJECT_NAME" | tee -a $LOG_FILE

# Build Backend
echo ""
echo "📦 Building Backend Docker image..." | tee -a $LOG_FILE
if [ -f "Dockerfile.backend" ]; then
  docker build -t ${PROJECT_NAME}-backend:latest -f Dockerfile. backend .  >> $LOG_FILE 2>&1
  if [ $? -eq 0 ]; then
    echo "✅ Backend image built successfully" | tee -a $LOG_FILE
  else
    echo "❌ Backend image build FAILED" | tee -a $LOG_FILE
    exit 1
  fi
else
  echo "⚠️  Dockerfile.backend not found" | tee -a $LOG_FILE
fi

# Build Frontend
echo ""
echo "📦 Building Frontend Docker image..." | tee -a $LOG_FILE
if [ -f "Dockerfile.frontend" ]; then
  docker build -t ${PROJECT_NAME}-frontend:latest -f Dockerfile.frontend .  >> $LOG_FILE 2>&1
  if [ $? -eq 0 ]; then
    echo "✅ Frontend image built successfully" | tee -a $LOG_FILE
  else
    echo "❌ Frontend image build FAILED" | tee -a $LOG_FILE
    exit 1
  fi
else
  echo "⚠️  Dockerfile.frontend not found" | tee -a $LOG_FILE
fi

echo ""
echo "======================================"
echo "✅ BUILD COMPLET SUCCESSFUL"
echo "======================================"
echo "Log file: $LOG_FILE"
EOF
chmod +x scripts/build.sh