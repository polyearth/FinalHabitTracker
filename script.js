let habits = [];

// Funkcija, lai pievienotu jaunu ieradumu
document.getElementById('add-habit').addEventListener('click', function() {
    const habitName = document.getElementById('habit-name').value;
    const habitFrequency = document.getElementById('habit-frequency').value;
    const habitGoal = parseInt(document.getElementById('habit-goal').value);

    if (habitName === "") {
        alert("Lūdzu, ievadiet ieraduma nosaukumu.");
        return;
    }

    const habit = {
        id: Date.now(), // unikāls ID
        name: habitName,
        frequency: habitFrequency,
        goal: habitGoal || 1, // Ja mērķis nav norādīts, pieņem vērtību 1
        completed: 0, // Izpildīto dienu skaits
        lastCompletedDate: null, // Pēdējā izpildes datums
    };

    habits.push(habit);
    updateHabitList();
    
    // Clear input fields
    document.getElementById('habit-name').value = "";
    document.getElementById('habit-frequency').value = "daily";
    document.getElementById('habit-goal').value = "";
});

// Funkcija, lai atjauninātu ieradumu sarakstu
function updateHabitList() {
    const habitsList = document.getElementById('habits-list');
    habitsList.innerHTML = ""; // Notīra esošo sarakstu

    habits.forEach(habit => {
        const habitElement = document.createElement('div');
        habitElement.classList.add('habit-item');
        if (habit.completed >= habit.goal) {
            habitElement.classList.add('completed');
        }

        habitElement.innerHTML = `
            <div>
                <h3>${habit.name} (${habit.frequency})</h3>
                <p>Mērķis: ${habit.goal} dienas</p>
                <p>Izpildīti: ${habit.completed}</p>
            </div>
            <div>
                <button class="mark" onclick="markCompleted(${habit.id})">Atzīmēt kā pabeigtu</button>
                <button class="edit" onclick="editHabit(${habit.id})">Rediģēt</button>
                <button class="delete" onclick="deleteHabit(${habit.id})">Dzēst</button>
            </div>
        `;

        habitsList.appendChild(habitElement);
    });
}

// Funkcija, lai atzīmētu ieradumu kā izpildītu
function markCompleted(id) {
    const habit = habits.find(h => h.id === id);
    
    const currentDate = new Date().toLocaleDateString();

    // Pārbaudām, vai ieradums jau ir atzīmēts šodien
    if (habit.lastCompletedDate === currentDate) {
        alert("Jūs jau esat atzīmējis šo ieradumu kā izpildītu šodien.");
        return;
    }

    if (habit && habit.completed < habit.goal) {
        habit.completed++;
        habit.lastCompletedDate = currentDate; // Saglabājam pēdējo izpildes datumu
        updateHabitList();
    }
}

// Funkcija, lai izdzēstu ieradumu
function deleteHabit(id) {
    habits = habits.filter(h => h.id !== id);
    updateHabitList();
}

// Funkcija, lai rediģētu ieradumu
function editHabit(id) {
    const habit = habits.find(h => h.id === id);
    if (habit) {
        document.getElementById('habit-name').value = habit.name;
        document.getElementById('habit-frequency').value = habit.frequency;
        document.getElementById('habit-goal').value = habit.goal;

        deleteHabit(id);
    }
}
