cat > scripts/cleanup.sh << 'EOF'
#!/bin/bash

echo "======================================"
echo "🧹 DÉMARRAGE DU CLEANUP"
echo "======================================"

# Arrêter les containers
echo "🛑 Arrêt des containers..."
docker-compose down -v 2>/dev/null || true

# Supprimer les images en dangling
echo "🗑️  Suppression des images dangling..."
docker image prune -f --filter "dangling=true" > /dev/null 2>&1 || true

# Supprimer les volumes orphelins
echo "🗑️  Suppression des volumes orphelins..."
docker volume prune -f > /dev/null 2>&1 || true

# Supprimer les réseaux non utilisés
echo "🗑️  Suppression des réseaux non utilisés..."
docker network prune -f > /dev/null 2>&1 || true

echo ""
echo "======================================"
echo "✅ CLEANUP TERMINÉ"
echo "======================================"
EOF
chmod +x scripts/cleanup.sh