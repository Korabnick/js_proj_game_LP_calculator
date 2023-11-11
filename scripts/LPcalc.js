let trainingPoints = 75;
let storyTrainingPoints = 0;
let strength = 30;
let agility = 30;
let mana = 0;
let manaCircle = 0;
let health = 500;
let oneHanded = 20;
let twoHanded = 20;
let archery = 20;
let skinning = "Нет";
let shelling = "Нет";
let harvesting = "Нет";
let crafting = "Нет";

// Характеристики 

// Количество очков обучения
function updateTrainingPoints(points) {
    trainingPoints += points;
    document.getElementById('trainingPoints').textContent = trainingPoints;
}

// Количество очков обучения за квенту (бонусные)
function updateStoryTrainingPoints(points) {
    if (storyTrainingPoints + points >= 0) {
        storyTrainingPoints += points;
        document.getElementById('storyTrainingPoints').textContent = storyTrainingPoints;
        updateTrainingPoints(points); // Обновление основных очков обучения
    }
}

document.getElementById('plusStoryPoints').addEventListener('click', function() {
    updateStoryTrainingPoints(1);
});

document.getElementById('minusStoryPoints').addEventListener('click', function() {
    if (storyTrainingPoints > 0) {
        // Проверяем, можно ли вычесть бонусные очки без перехода в отрицательное значение основных очков
        if (trainingPoints > 0) {
            storyTrainingPoints--;
            document.getElementById('storyTrainingPoints').textContent = storyTrainingPoints;
            trainingPoints--; // Вычитаем одно основное очко
            document.getElementById('trainingPoints').textContent = trainingPoints;
        } else {
            alert('Ошибка: Количество очков обучения не может быть отрицательным.');
        }
    } else {
        alert('У вас нет бонусных очков для вычета.');
    }
});

// Сила +
document.getElementById('plusStrength').addEventListener('click', function() {
    if (strength === 80) {
        alert('Сила уже на максимуме');
    } else {
        let cost = strength >= 55 ? 2 : 1;
        if (trainingPoints >= cost) {
            strength++;
            document.getElementById('strength').textContent = strength;
            updateTrainingPoints(-cost);
            if (strength > 30) {
                document.getElementById('minusStrength').style.display = 'inline'; // Появление кнопки "-"
            }
        } else {
            alert('Недостаточно очков обучения');
        }
    }
});

// Сила -
document.getElementById('minusStrength').addEventListener('click', function() {
    if (strength > 30) {
        let refund = strength >= 55 ? 2 : 1;
        strength--;
        document.getElementById('strength').textContent = strength;
        updateTrainingPoints(refund);
        if (strength === 30) {
            this.style.display = 'none'; // Достигнуто минимальное значение силы
        }
        if (strength < 80) {
            document.getElementById('plusStrength').style.display = 'inline'; // Возможность нажать "+"
        }
    }
});

// Ловкость +
document.getElementById('plusAgility').addEventListener('click', function() {
    if (agility === 80) {
        alert('Ловкость уже на максимуме');
    } else {
        let cost = agility >= 55 ? 2 : 1;
        if (trainingPoints >= cost) {
            agility++;
            document.getElementById('agility').textContent = agility;
            updateTrainingPoints(-cost);
            if (agility > 30) {
                document.getElementById('minusAgility').style.display = 'inline'; // Появление кнопки "-"
            }
        } else {
            alert('Недостаточно очков обучения');
        }
    }
});

// Ловкость -
document.getElementById('minusAgility').addEventListener('click', function() {
    if (agility > 30) {
        let refund = agility >= 55 ? 2 : 1;
        agility--;
        document.getElementById('agility').textContent = agility;
        updateTrainingPoints(refund);
        if (agility === 30) {
            this.style.display = 'none'; // Достигнуто минимальное значение ловкости
        }
        if (agility < 80) {
            document.getElementById('plusAgility').style.display = 'inline'; // Возможность нажать "+"
        }
    }
});

// Логика подсчёта маны
function updateManaAndCircle(mana) {
    if (mana > 750) {
        mana = 750;
    } else if (mana >= 610) {
        manaCircle = 6;
    } else if (mana >= 460) {
        manaCircle = 5;
    } else if (mana >= 310) {
        manaCircle = 4;
    } else if (mana >= 160) {
        manaCircle = 3;
    } else if (mana >= 90) {
        manaCircle = 2;
    } else {
        manaCircle = 1;
    }

    document.getElementById('mana').textContent = mana;
    document.getElementById('manaCircle').textContent = manaCircle;

    if (mana > 0) {
        document.getElementById('minusMana').style.display = 'inline';
    } else {
        document.getElementById('minusMana').style.display = 'none';
        document.getElementById('manaCircle').textContent = 0;
    }
}

// Мана +
document.getElementById('plusMana').addEventListener('click', function() {
    if (trainingPoints > 0 && mana < 750) {
        mana += 10;
        if (mana > 750) {
            alert('Вы достигли максимума для данного навыка.');
            mana = 750;
        }
        updateManaAndCircle(mana);
        updateTrainingPoints(-1);
    } else if (mana >= 750) {
        alert('Вы достигли максимума для данного навыка.');
    } else {
        alert('Недостаточно очков обучения для этого действия.');
    }
});

// Мана -
document.getElementById('minusMana').addEventListener('click', function() {
    if (mana > 0) {
        mana -= 10;
        updateManaAndCircle(mana);
        updateTrainingPoints(1);

        if (mana === 0) {
            document.getElementById('minusMana').style.display = 'none';
        }
    }
}); 

// Здоровье +
document.getElementById('plusHealth').addEventListener('click', function() {
    if (trainingPoints > 0 && health < 750) {
        if (health >= 650) {
            health += 5;
        } else {
            health += 10;
        }
        if (health > 750) {
            alert('Вы достигли максимума для данного навыка.');
            health = 750;
        }
        updateHealth(health);
        updateTrainingPoints(-1);
    } else if (health >= 750) {
        alert('Вы достигли максимума для данного навыка.');
    } else {
        alert('Недостаточно очков обучения для этого действия.');
    }
});

// Здоровье -
document.getElementById('minusHealth').addEventListener('click', function() {
    if (health > 500) {
        if (health > 650) {
            health -= 5;
        } else {
            health -= 10;
        }
        updateHealth(health);
        updateTrainingPoints(1);
    }
});

// Логика подсчёта здоровья.
function updateHealth(health) {
    document.getElementById('health').textContent = health;
    if (health > 500) {
        document.getElementById('minusHealth').style.display = 'inline';
    } else {
        document.getElementById('minusHealth').style.display = 'none';
    }
}

// Навыки

// Логика подсчёта владения одноручного оружия.
function updateOneHanded(value, cost) {
    document.getElementById('oneHanded').textContent = value;
    updateTrainingPoints(cost);
    if (value > 20) {
        document.getElementById('minusOneHanded').style.display = 'inline';
    } else {
        document.getElementById('minusOneHanded').style.display = 'none';
    }
}

// Одноручное +
document.getElementById('plusOneHanded').addEventListener('click', function() {
    if (oneHanded === 90) {
        alert('Вы достигли максимального уровня владения одноручным мечом.');
        return;
    }

    if (trainingPoints >= 5) {
        if (oneHanded === 20) {
            oneHanded += 30;
            updateOneHanded(oneHanded, -5);
        } else if (oneHanded === 50) {
            oneHanded += 20;
            updateOneHanded(oneHanded, -10);
        } else if (oneHanded === 70) {
            oneHanded = 90;
            updateOneHanded(oneHanded, -20);
        }
    } else {
        alert('Недостаточно очков обучения');
    }
});

// Одноручное -
document.getElementById('minusOneHanded').addEventListener('click', function() {
    if (oneHanded > 20) {
        if (oneHanded === 90) {
            oneHanded -= 20;
            updateOneHanded(oneHanded, 20);
        } else if (oneHanded === 70) {
            oneHanded -= 20;
            updateOneHanded(oneHanded, 10);
        } else if (oneHanded === 50) {
            oneHanded -= 30;
            updateOneHanded(oneHanded, 5);
        }
    }
});

// Логика подсчёта владения двуручного оружия.
function updateTwoHanded(value, cost) {
    document.getElementById('twoHanded').textContent = value;
    updateTrainingPoints(cost);
    if (value > 20) {
        document.getElementById('minusTwoHanded').style.display = 'inline';
    } else {
        document.getElementById('minusTwoHanded').style.display = 'none';
    }
}

// Двуручное +
document.getElementById('plusTwoHanded').addEventListener('click', function() {
    if (twoHanded === 90) {
        alert('Вы достигли максимального уровня владения двуручным мечом.');
        return;
    }

    if (trainingPoints >= 5) {
        if (twoHanded === 20) {
            twoHanded += 30;
            updateTwoHanded(twoHanded, -5);
        } else if (twoHanded === 50) {
            twoHanded += 20;
            updateTwoHanded(twoHanded, -10);
        } else if (twoHanded === 70) {
            twoHanded = 90;
            updateTwoHanded(twoHanded, -20);
        }
    } else {
        alert('Недостаточно очков обучения');
    }
});

// Двуручное -
document.getElementById('minusTwoHanded').addEventListener('click', function() {
    if (twoHanded > 20) {
        if (twoHanded === 90) {
            twoHanded -= 20;
            updateTwoHanded(twoHanded, 20);
        } else if (twoHanded === 70) {
            twoHanded -= 20;
            updateTwoHanded(twoHanded, 10);
        } else if (twoHanded === 50) {
            twoHanded -= 30;
            updateTwoHanded(twoHanded, 5);
        }
    }
});

// Логика подсчёта владения луком.
function updateArchery(value, cost) {
    document.getElementById('archery').textContent = value;
    updateTrainingPoints(cost);
    if (value > 20) {
        document.getElementById('minusArchery').style.display = 'inline';
    } else {
        document.getElementById('minusArchery').style.display = 'none';
    }
}

// Лук +
document.getElementById('plusArchery').addEventListener('click', function() {
    if (archery === 90) {
        alert('Вы достигли максимального уровня владения луком.');
        return;
    }

    if (trainingPoints >= 5) {
        if (archery === 20) {
            archery += 30;
            updateArchery(archery, -5);
        } else if (archery === 50) {
            archery += 20;
            updateArchery(archery, -10);
        } else if (archery === 70) {
            archery = 90;
            updateArchery(archery, -20);
        }
    } else {
        alert('Недостаточно очков обучения');
    }
});

// Лук -
document.getElementById('minusArchery').addEventListener('click', function() {
    if (archery > 20) {
        if (archery === 90) {
            archery -= 20;
            updateArchery(archery, 20);
        } else if (archery === 70) {
            archery -= 20;
            updateArchery(archery, 10);
        } else if (archery === 50) {
            archery -= 30;
            updateArchery(archery, 5);
        }
    }
});

document.getElementById('toggleSkinning').addEventListener('click', function() {
    if (skinning === "Нет" && trainingPoints >= 5) {
        skinning = "Да";
        updateTrainingPoints(-5);
    } else if (skinning === "Да") {
        skinning = "Нет";
        updateTrainingPoints(5);
    } else {
        alert("Недостаточно очков обучения для этого действия!");
    }
    document.getElementById('skinning').textContent = skinning;
});

document.getElementById('toggleShelling').addEventListener('click', function() {
    if (trainingPoints > 0) {
        shelling = shelling === "Нет" ? "Да" : "Нет";
        document.getElementById('shelling').textContent = shelling;
        if (shelling === "Да") {
            updateTrainingPoints(-1);
        } else {
            updateTrainingPoints(1);
        }
    } else {
        alert("Недостаточно очков обучения для этого действия!");
    }
});

document.getElementById('toggleHarvesting').addEventListener('click', function() {
    if (trainingPoints > 0) {
        harvesting = harvesting === "Нет" ? "Да" : "Нет";
        document.getElementById('harvesting').textContent = harvesting;
        if (harvesting === "Да") {
            updateTrainingPoints(-1);
        } else {
            updateTrainingPoints(1);
        }
    } else {
        alert("Недостаточно очков обучения для этого действия!");
    }
});

document.getElementById('plusCrafting').addEventListener('click', function() {
    if (trainingPoints > 0) {
        if (crafting === "Нет" && trainingPoints >= 5) {
            crafting = "T1";
            updateTrainingPoints(-5);
        } else if (crafting === "T1" && trainingPoints >= 7) {
            crafting = "T2";
            updateTrainingPoints(-7);
        } else if (crafting === "T2" && trainingPoints >= 9) {
            crafting = "T3";
            updateTrainingPoints(-9);
            document.getElementById('minusCrafting').style.display = 'inline'; // Показать кнопку минуса для T3
        } else if (crafting === "T3") {
            alert("Достигнут максимальный уровень ремесла"); // Оповещение о достижении максимального уровня
        } else {
            alert("Недостаточно очков обучения для этого действия!");
        }
        document.getElementById('crafting').textContent = crafting;
        document.getElementById('minusCrafting').style.display = 'inline'; // Показать кнопку минуса по умолчанию
    } else {
        alert("Недостаточно очков обучения для этого действия!");
    }
});

document.getElementById('minusCrafting').addEventListener('click', function() {
    if (crafting !== "Нет") {
        if (crafting === "T4") {
            if (trainingPoints >= 11) {
                crafting = "T3";
                updateTrainingPoints(11);
                document.getElementById('plusCrafting').disabled = false;
            } else {
                alert("Недостаточно очков обучения для этого действия!");
            }
        } else if (crafting === "T3") {
            crafting = "T2";
            updateTrainingPoints(9);
        } else if (crafting === "T2") {
            crafting = "T1";
            updateTrainingPoints(7);
        } else if (crafting === "T1") {
            crafting = "Нет";
            updateTrainingPoints(5);
            document.getElementById('minusCrafting').style.display = 'none';
        } else {
            alert("Достигнут минимальный уровень ремесла");
        }
        document.getElementById('crafting').textContent = crafting;
    } else {
        alert("Недостаточно очков обучения для этого действия!");
    }
});