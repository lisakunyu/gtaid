    score: 0,
    document.getElementById('upgradeDamage').addEventListener('touchstart', (e) => {
        if (game.showUpgradeMenu) upgradeStat('damage');
    document.getElementById('upgradeCount').addEventListener('touchstart', (e) => {
        if (game.showUpgradeMenu) upgradeStat('count');
    document.getElementById('upgradeShotCount').addEventListener('touchstart', (e) => {
        if (game.showUpgradeMenu) upgradeStat('shotCount');
// Toggle upgrade menu
    const menu = document.getElementById('upgradeMenu');
// Handle upgrades
function upgradeStat(stat) {
    if (stat === 'damage' && game.score >= 100) {
        game.score -= 100;
        game.score -= 1000;
        game.score -= 500;
    document.getElementById('scoreDisplay').textContent = `Score: ${game.score}`;
    game.ctx.fillText(`Score: ${game.score}`, game.canvas.width / 2, game.canvas.height / 2 + 20);
    game.score = 0;
    document.getElementById('scoreDisplay').textContent = `Score: ${game.score}`;
                    document.getElementById('scoreDisplay').textContent = `Score: ${game.score}`;
                            game.score += points;
                        document.getElementById('scoreDisplay').textContent = `Score: ${game.score}`;
                        game.score += points;
                    document.getElementById('scoreDisplay').textContent = `Score: ${game.score}`;
                        game.score += points;
                    document.getElementById('scoreDisplay').textContent = `Score: ${game.score}`;