        width: 50,
        height: 50,
        speed: 8,
        fireRate: 300,
    },
        width: 10,
        height: 30,
        color: '#FFEB3B',
        damage: 50,
        speed: 25,
        count: 1,
        shotCount: 1
    },
        baseHp: 50,
        width: 40,
        height: 40,
        minSpeed: 1,
        maxSpeed: 3,
        spawnRate: 0.02,
    },
    specialEnemy: {
        width: 30,
        height: 30,
        hp: 100,
        speed: 4,
        spawnInterval: 5000,
        points: 250,
        color: '#00FFFF'
    },
    shooterEnemy: {
        width: 40,
        height: 40,
        hp: 150,
        speed: 2,
        spawnRate: 0.005,
        fireRate: 2000,
        points: 100
    },
    explosiveEnemy: {
        width: 35,
        height: 35,
        hp: 80,
        speed: 2.5,
        spawnRate: 0.01,
        explosionRadius: 50,
        explosionDamage: 20,
        points: 50,
        color: '#FF4500'
    },
    powerUp: {
        width: 20,
        height: 20,
        speed: 2,
        spawnInterval: 15000,
        duration: 5000,
        damageBoost: 2,
        speedBoost: 2,
        color: '#00FF00'
    },
    shieldPowerUp: {
        width: 20,
        height: 20,
        speed: 2,
        spawnInterval: 20000,
        duration: 6000,
        color: '#FFD700'
    },
    supportShip: {
        width: 40,
        height: 40,
        speed: 5,
        fireRate: 500,
        duration: 10000
    },
    specialObject: {
        width: 25,
        height: 25,
        speed: 1.5,
        spawnInterval: 10000,
        points: 100
    },
    rocket: {
        width: 20,
        height: 40,
        speed: 10,
        damage: 1000,
        color: '#FF4444'
    },
    game: {
        levelUpScore: 5000,
    }
};

// Game state
const game = {
    canvas: null,
    ctx: null,
    assets: {
        powerUp: null,
        supportShip: null,
        rocket: null,
        specialObject: null,
        shieldPowerUp: null,
        loaded: 0
    },
        x: 0,
        y: 0,
        lastShot: 0,
        hasShield: false,
        shieldEndTime: 0
    },
    enemies: [],
    powerUps: [],
    stars: [],
    level: 1,
    gameTime: 0,
    leftPressed: false,
    rightPressed: false,
    paused: false,
    showUpgradeMenu: false,
    lastSpecialSpawn: 0,
    lastPowerUpSpawn: 0,
    powerUpActive: false,
    powerUpEndTime: 0,
    backgroundOffset: 0,
    backgroundSpeed: 2,
    lastSupportSpawn: 0,
    supportActive: false,
    supportEndTime: 0,
    supportShip: null,
    supportBullets: [],
    lastShooterSpawn: 0,
    explosionParticles: [],
    rockets: 1,
    rocketBullets: [],
    rocketSmoke: [],
    lastExplosiveSpawn: 0,
    lastShieldSpawn: 0,
    specialObjects: [],
    lastSpecialObjectSpawn: 0,
    lastTapTime: 0, // Untuk deteksi double tap
    tapCount: 0     // Menghitung jumlah tap
};

// Initialize game
function init() {
    game.canvas = document.getElementById('gameCanvas');
    game.ctx = game.canvas.getContext('2d');
    
    loadImage('powerUp', 'images/powerUp.png');
    loadImage('supportShip', 'images/supportship.png');
    loadImage('rocket', 'images/rocket.png');
    loadImage('specialObject', 'images/specialObject.png');
    loadImage('shieldPowerUp', 'images/shieldPowerUp.png');
    
    setupControls();
    
    for (let i = 0; i < 100; i++) {
        game.stars.push({
            x: Math.random() * game.canvas.width,
            y: Math.random() * game.canvas.height,
            size: Math.random() * 2 + 1,
            brightness: Math.random(),
            twinkleSpeed: Math.random() * 0.05 + 0.02,
            speedX: (Math.random() - 0.5) * 2,
            speedY: Math.random() * 2 + 1
        });
    }
    
    const checkReady = setInterval(() => {
        if (game.assets.loaded === 8) {
            clearInterval(checkReady);
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            setupDoubleTap();
            requestAnimationFrame(gameLoop);
        }
    }, 100);
}

// Load image function
function loadImage(name, path) {
    const img = new Image();
    img.src = path;
    img.onload = () => {
        game.assets[name] = img;
        game.assets.loaded++;
    };
    img.onerror = () => {
        console.error(`Failed to load image: ${path}`);
        game.assets[name] = null;
        game.assets.loaded++;
    };
}

// Canvas resize handler
function resizeCanvas() {
    game.canvas.width = window.innerWidth;
    game.canvas.height = window.innerHeight;
    game.stars.forEach(star => {
        star.x = Math.random() * game.canvas.width;
        star.y = Math.random() * game.canvas.height;
    });
}

// Setup touch controls
function setupControls() {
    document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        game.leftPressed = true;
    });
    document.getElementById('leftBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        game.leftPressed = false;
    });
    document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        game.rightPressed = true;
    });
    document.getElementById('rightBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        game.rightPressed = false;
    });

        e.preventDefault();
    });
        e.preventDefault();
    });
        e.preventDefault();
    });
    document.getElementById('closeMenu').addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (game.showUpgradeMenu) toggleUpgradeMenu();
    });

    document.getElementById('rocketBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (game.rockets > 0 && !game.paused) {
            game.rockets--;
            game.rocketBullets.push({
            });
        }
    });
}

// Setup double tap detection
function setupDoubleTap() {
    game.canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const currentTime = Date.now();
        const tapInterval = currentTime - game.lastTapTime;

        if (tapInterval < 300 && game.tapCount === 1) { // 300ms untuk double tap
            toggleUpgradeMenu();
            game.tapCount = 0;
        } else {
            game.tapCount = 1;
        }
        game.lastTapTime = currentTime;
    });
}

// Auto fire mechanism
function autoFire(timestamp) {

                    speed: speed,
                    damage: damage
                });
            }
        }
    }
}

// Spawn regular enemies
        game.enemies.push({
            hp: hp,
            maxHp: hp,
            isBoss: false,
            isSpecial: false,
            isShooter: false,
            isExplosive: false,
            direction: 0,
            movePattern: 0
        });
    }
}

function spawnBoss() {
    const hp = game.level === 1 ? baseHp : baseHp * Math.pow(5, game.level - 1);
    game.enemies.push({
        speed: 1,
        hp: hp,
        maxHp: hp,
        isBoss: true,
        isSpecial: false,
        isShooter: false,
        isExplosive: false,
        direction: Math.random() > 0.5 ? 1 : -1,
        movePattern: Math.floor(Math.random() * 3)
    });
    document.getElementById('levelDisplay').textContent = `Level: ${game.level} (BOSS!)`;
}

function spawnSpecialEnemy(timestamp) {
        game.enemies.push({
            isBoss: false,
            isSpecial: true,
            isShooter: false,
            isExplosive: false,
            direction: Math.random() > 0.5 ? 1 : -1
        });
        game.lastSpecialSpawn = timestamp;
    }
}

function spawnShooterEnemy(timestamp) {
        game.enemies.push({
            isBoss: false,
            isSpecial: false,
            isShooter: true,
            isExplosive: false,
            lastShot: 0
        });
        game.lastShooterSpawn = timestamp;
    }
}

function spawnExplosiveEnemy(timestamp) {
        game.enemies.push({
            isBoss: false,
            isSpecial: false,
            isShooter: false,
            isExplosive: true
        });
        game.lastExplosiveSpawn = timestamp;
    }
}

            width: 5,
            height: 10,
        });
    }
}

// Spawn power-up
function spawnPowerUp(timestamp) {
        game.powerUps.push({
            isShield: false
        });
        game.lastPowerUpSpawn = timestamp;
    }
}

// Spawn shield power-up
function spawnShieldPowerUp(timestamp) {
        game.powerUps.push({
            isShield: true
        });
        game.lastShieldSpawn = timestamp;
    }
}

// Spawn special object
function spawnSpecialObject(timestamp) {
        game.specialObjects.push({
        });
        game.lastSpecialObjectSpawn = timestamp;
    }
}

// Spawn support ship
function spawnSupportShip(timestamp) {
    if (!game.supportActive) {
        game.supportShip = {
            lastShot: 0
        };
        game.supportActive = true;
    }
}

// Support ship fire
function supportShipFire(timestamp) {
        game.supportBullets.push({
            y: game.supportShip.y,
            width: 5,
            height: 15,
        });
        game.supportShip.lastShot = timestamp;
    }
}

// Check for level progression
function checkLevel() {
        game.level++;
        spawnBoss();
    }
}

// Enemy movement patterns
        const padding = 10;
        const maxY = game.canvas.height * 0.3;
        
            case 0:
                break;
            case 1:
                }
                break;
            case 2:
                if (Math.random() < 0.05) {
                }
                break;
        }

        
        }
    } else {
    }
}

// Collision detection
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function toggleUpgradeMenu() {
    game.paused = !game.paused;
    game.showUpgradeMenu = !game.showUpgradeMenu;
    menu.style.display = game.showUpgradeMenu ? 'block' : 'none';
    if (game.showUpgradeMenu) {
    }
}

    }
}

// Create explosion effect
function createExplosion(x, y, isSpecial = false) {
    const particleCount = isSpecial ? 25 : 15;
    const maxSize = isSpecial ? 6 : 4;
    
    for (let i = 0; i < particleCount; i++) {
        game.explosionParticles.push({
            x: x + Math.random() * 20 - 10,
            y: y + Math.random() * 20 - 10,
            size: Math.random() * maxSize + 2,
            speedX: (Math.random() - 0.5) * (isSpecial ? 5 : 4),
            speedY: (Math.random() - 0.5) * (isSpecial ? 5 : 4),
            life: isSpecial ? 35 : 30,
            color: isSpecial ? `rgba(0, 255, 255, ${Math.random()})` : `rgba(255, 165, 0, ${Math.random()})`
        });
    }
}

// Create rocket smoke
function createRocketSmoke(rocket) {
    for (let i = 0; i < 2; i++) {
        game.rocketSmoke.push({
            x: rocket.x + rocket.width / 2 + (Math.random() - 0.5) * 10,
            y: rocket.y + rocket.height,
            size: Math.random() * 8 + 4,
            speedX: (Math.random() - 0.5) * 3,
            speedY: Math.random() * 2 + 2,
            life: 25,
            opacity: 0.9
        });
    }
}

// Game over
function gameOver() {
    game.paused = true;
    game.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
    game.ctx.fillStyle = '#FFF';
    game.ctx.font = '36px Arial';
    game.ctx.textAlign = 'center';
    game.ctx.fillText('Game Over', game.canvas.width / 2, game.canvas.height / 2 - 20);
    game.ctx.font = '24px Arial';
    game.ctx.fillText('Tap to Restart', game.canvas.width / 2, game.canvas.height / 2 + 60);

    game.canvas.addEventListener('touchstart', restartGame, { once: true });
}

function restartGame() {
    game.level = 1;
    game.enemies = [];
    game.powerUps = [];
    game.specialObjects = [];
    game.paused = false;
    game.showUpgradeMenu = false;
    game.powerUpActive = false;
    game.supportShip = null;
    game.supportBullets = [];
    game.supportActive = false;
    game.rocketBullets = [];
    game.rocketSmoke = [];
    game.rockets = 1;
    document.getElementById('levelDisplay').textContent = `Level: ${game.level}`;
}

// Update game state
function update(timestamp) {
    if (game.paused) return;

    try {

        autoFire(timestamp);

        game.backgroundOffset += game.backgroundSpeed;
        if (game.backgroundOffset >= game.canvas.height) {
            game.backgroundOffset = 0;
        }

        game.stars.forEach(star => {
            star.x += star.speedX;
            star.y += star.speedY;
            if (star.x < 0 || star.x > game.canvas.width || star.y > game.canvas.height) {
                star.x = Math.random() * game.canvas.width;
                star.y = -star.size;
                star.speedX = (Math.random() - 0.5) * 2;
                star.speedY = Math.random() * 2 + 1;
            }
        });

        }

        spawnSpecialEnemy(timestamp);
        spawnShooterEnemy(timestamp);
        spawnExplosiveEnemy(timestamp);
        spawnPowerUp(timestamp);
        spawnShieldPowerUp(timestamp);
        spawnSpecialObject(timestamp);

        for (let i = game.powerUps.length - 1; i >= 0; i--) {
            const powerUp = game.powerUps[i];
            powerUp.y += powerUp.speed;
                    if (powerUp.isShield) {
                    } else {
                        game.powerUpActive = true;
                    }
                    game.powerUps.splice(i, 1);
                    break;
                }
            }
            if (powerUp.y > game.canvas.height) game.powerUps.splice(i, 1);
        }

        if (game.powerUpActive && timestamp >= game.powerUpEndTime) game.powerUpActive = false;

        for (let i = game.specialObjects.length - 1; i >= 0; i--) {
            const obj = game.specialObjects[i];
            obj.y += obj.speed;
                    spawnSupportShip(timestamp);
                    game.specialObjects.splice(i, 1);
                    break;
                }
            }
            if (obj.y > game.canvas.height) game.specialObjects.splice(i, 1);
        }

        if (game.supportActive) {
            supportShipFire(timestamp);
            if (game.supportShip) {
            }

            for (let i = game.supportBullets.length - 1; i >= 0; i--) {
                game.supportBullets[i].y -= game.supportBullets[i].speed;
                if (game.supportBullets[i].y < 0) {
                    game.supportBullets.splice(i, 1);
                    continue;
                }
                for (let j = game.enemies.length - 1; j >= 0; j--) {
                    if (checkCollision(game.supportBullets[i], game.enemies[j])) {
                        game.enemies[j].hp -= game.supportBullets[i].damage;
                        game.supportBullets.splice(i, 1);
                        if (game.enemies[j].hp <= 0) {
                            if (game.enemies[j].isBoss) {
                                document.getElementById('levelDisplay').textContent = `Level: ${game.level}`;
                                createExplosion(game.enemies[j].x + game.enemies[j].width / 2, game.enemies[j].y + game.enemies[j].height / 2);
                            } else if (game.enemies[j].isExplosive) {
                                createExplosion(game.enemies[j].x + game.enemies[j].width / 2, game.enemies[j].y + game.enemies[j].height / 2, true);
                                for (let k = game.enemies.length - 1; k >= 0; k--) {
                                        if (game.enemies[k].hp <= 0) game.enemies.splice(k, 1);
                                    }
                                }
                            }
                            game.enemies.splice(j, 1);
                        }
                        break;
                    }
                }
            }

            if (timestamp >= game.supportEndTime) {
                game.supportShip = null;
                game.supportActive = false;
            }
        }

                        gameOver();
                        return;
                    }
                }
            }
        }

        for (let i = game.enemies.length - 1; i >= 0; i--) {
                        
                        }
                        
                            document.getElementById('levelDisplay').textContent = `Level: ${game.level}`;
                            toggleUpgradeMenu();
                            for (let k = game.enemies.length - 1; k >= 0; k--) {
                                    if (game.enemies[k].hp <= 0) game.enemies.splice(k, 1);
                                }
                            }
                        }
                        game.enemies.splice(i, 1);
                    }
                    break;
                }
            }
                game.enemies.splice(i, 1);
                    gameOver();
                    return;
                }
            }
        }

        for (let i = game.rocketBullets.length - 1; i >= 0; i--) {
            game.rocketBullets[i].y -= game.rocketBullets[i].speed;
            createRocketSmoke(game.rocketBullets[i]);
            if (game.rocketBullets[i].y < 0) {
                game.rocketBullets.splice(i, 1);
                continue;
            }
            for (let j = game.enemies.length - 1; j >= 0; j--) {
                if (checkCollision(game.rocketBullets[i], game.enemies[j])) {
                    game.enemies[j].hp -= game.rocketBullets[i].damage;
                    game.rocketBullets.splice(i, 1);
                    if (game.enemies[j].hp <= 0) {
                        if (game.enemies[j].isBoss) {
                            document.getElementById('levelDisplay').textContent = `Level: ${game.level}`;
                            createExplosion(game.enemies[j].x + game.enemies[j].width / 2, game.enemies[j].y + game.enemies[j].height / 2);
                            toggleUpgradeMenu();
                        } else if (game.enemies[j].isExplosive) {
                            createExplosion(game.enemies[j].x + game.enemies[j].width / 2, game.enemies[j].y + game.enemies[j].height / 2, true);
                            for (let k = game.enemies.length - 1; k >= 0; k--) {
                                    if (game.enemies[k].hp <= 0) game.enemies.splice(k, 1);
                                }
                            }
                        }
                        game.enemies.splice(j, 1);
                    }
                    break;
                }
            }
        }

        for (let i = game.explosionParticles.length - 1; i >= 0; i--) {
            const particle = game.explosionParticles[i];
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.life--;
            if (particle.life <= 0) game.explosionParticles.splice(i, 1);
        }

        for (let i = game.rocketSmoke.length - 1; i >= 0; i--) {
            const smoke = game.rocketSmoke[i];
            smoke.x += smoke.speedX;
            smoke.y += smoke.speedY;
            smoke.life--;
            smoke.opacity -= 0.04;
            if (smoke.life <= 0 || smoke.opacity <= 0) game.rocketSmoke.splice(i, 1);
        }

        checkLevel();


        game.gameTime++;
    } catch (error) {
        console.error("Error in update:", error);
    }
}

// Draw health bar
    const barHeight = 5;
    game.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    game.ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
}

// Draw game
function draw() {
    game.ctx.fillStyle = '#000';
    game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

    game.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    game.ctx.lineWidth = 1;
    for (let i = -game.canvas.width; i < game.canvas.width * 2; i += 20) {
        game.ctx.beginPath();
        game.ctx.moveTo(i, game.backgroundOffset - game.canvas.height);
        game.ctx.lineTo(i, game.backgroundOffset);
        game.ctx.stroke();
    }

    game.stars.forEach(star => {
        star.brightness += star.twinkleSpeed;
        if (star.brightness > 1) {
            star.brightness = 1;
            star.twinkleSpeed = -star.twinkleSpeed;
        } else if (star.brightness < 0) {
            star.brightness = 0;
            star.twinkleSpeed = -star.twinkleSpeed;
        }
        game.ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        game.ctx.beginPath();
        game.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        game.ctx.fill();
    });

    } else {
        game.ctx.fillStyle = '#2196F3';
    }
        game.ctx.strokeStyle = '#FFD700';
        game.ctx.lineWidth = 2;
    }

        });
    } else {
        });
    }

    game.ctx.fillStyle = '#00FFAA';
    });

    if (game.supportShip) {
        if (game.assets.supportShip) {
            game.ctx.drawImage(game.assets.supportShip, game.supportShip.x, game.supportShip.y, game.supportShip.width, game.supportShip.height);
        } else {
            game.ctx.fillStyle = '#00AAFF';
            game.ctx.fillRect(game.supportShip.x, game.supportShip.y, game.supportShip.width, game.supportShip.height);
        }
    }

    game.rocketBullets.forEach(rocket => {
        if (game.assets.rocket) {
        } else {
        }
    });

        } else {
        }
    });

    game.powerUps.forEach(powerUp => {
        if (powerUp.isShield) {
            if (game.assets.shieldPowerUp) {
                game.ctx.drawImage(game.assets.shieldPowerUp, powerUp.x, powerUp.y, powerUp.width, powerUp.height);
            } else {
                game.ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
            }
        } else {
            if (game.assets.powerUp) {
                game.ctx.drawImage(game.assets.powerUp, powerUp.x, powerUp.y, powerUp.width, powerUp.height);
            } else {
                game.ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
            }
        }
    });

    game.specialObjects.forEach(obj => {
        if (game.assets.specialObject) {
            game.ctx.drawImage(game.assets.specialObject, obj.x, obj.y, obj.width, obj.height);
        } else {
            game.ctx.fillStyle = '#FFFFFF';
            game.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        }
    });

    });

    game.explosionParticles.forEach(particle => {
        game.ctx.fillStyle = particle.color || `rgba(255, 165, 0, ${particle.life / 30})`;
        game.ctx.beginPath();
        game.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        game.ctx.fill();
    });

    game.rocketSmoke.forEach(smoke => {
        game.ctx.fillStyle = `rgba(150, 150, 150, ${smoke.opacity})`;
        game.ctx.beginPath();
        game.ctx.arc(smoke.x, smoke.y, smoke.size, 0, Math.PI * 2);
        game.ctx.fill();
    });
}

// Game loop
function gameLoop(timestamp) {
    try {
        update(timestamp);
        draw();
        requestAnimationFrame(gameLoop);
    } catch (error) {
        console.error("Error in gameLoop:", error);
    }
}

// Start the game
init();