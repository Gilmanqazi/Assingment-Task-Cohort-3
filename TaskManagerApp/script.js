
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskCategorySelect = document.getElementById('task-category');
const taskList = document.getElementById('task-list');


const searchInput = document.getElementById('search-input');
const filterCategory = document.getElementById('filter-category');
const clearAllBtn = document.getElementById('clear-all-btn');
const pendingCountEl = document.getElementById('pending-count');
const completedCountEl = document.getElementById('completed-count');

// Local Storage 
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

/**
 * ATTRIBUTES VS PROPERTIES DEMONSTRATION
 * Triggers when clicking the demo button in the creator panel.
 */
document.getElementById('demo-attr-prop').addEventListener('click', () => {
    console.log("=== Attributes vs Properties Demo ===");
    
    /* EXPLANATION:
      - input.getAttribute('value') reads the initial static HTML text literal from the source markup. 
        It reflects what was hardcoded in HTML: value="New Task Idea". It rarely changes automatically.
      - input.value tracks the dynamic, real-time live execution state updated by human interaction on your screen.
    */
    console.log("HTML Static Attribute [input.getAttribute('value')]:", taskTitleInput.getAttribute('value'));
    console.log("Live Execution Property [input.value]:", taskTitleInput.value);
});


/**
 * DYNAMIC TASK CARD BUILDER (Using DOM Methods)
 */
function createTaskCard(task) {
    // createElement()
    const card = document.createElement('div');
    
    //  Managing data attributes via dataset and setAttribute
    card.classList.add('task-card');
    card.setAttribute('data-id', task.id); 
    card.dataset.status = task.status;       // Equivalent to setAttribute('data-status')
    card.dataset.category = task.category;   // Equivalent to setAttribute('data-category')

    // Create Card Header Content Section
    const textContainer = document.createElement('div');
    const titleHeader = document.createElement('h3');
    titleHeader.classList.add('task-title');
    
    // createTextNode() & append()
    const textNode = document.createTextNode(task.title);
    titleHeader.append(textNode);

    const categoryBadge = document.createElement('span');
    categoryBadge.classList.add('badge');
    categoryBadge.innerText = ` [${task.category.toUpperCase()}]`;
    titleHeader.append(categoryBadge);
    textContainer.append(titleHeader);

    // Create Interactive Controls Panel
    const actionsContainer = document.createElement('div');
    actionsContainer.classList.add('task-actions');

    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-secondary edit-btn';
    editBtn.innerText = 'Edit';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'btn btn-success complete-btn';
    completeBtn.innerText = task.status === 'completed' ? 'Undo' : 'Complete';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger delete-btn';
    deleteBtn.innerText = 'Delete';

    // Build the actions block
    actionsContainer.append(editBtn, completeBtn, deleteBtn);
    
    // Assemble completed card wrapper component
    card.append(textContainer, actionsContainer);

    return card;
}

/**
 * CORE RENDER FUNCTION WITH DOCUMENT FRAGMENT (Bonus)
 */
function renderTasks() {
    // Clear out preexisting elements
    taskList.innerHTML = '';
    
    // Filter array items matching search criteria
    const searchFilter = searchInput.value.toLowerCase();
    const catFilter = filterCategory.value;

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchFilter);
        const matchesCategory = catFilter === 'all' || task.category === catFilter;
        return matchesSearch && matchesCategory;
    });

    // Performance Optimization: Use DocumentFragment
    const fragment = document.createDocumentFragment();

    filteredTasks.forEach(task => {
        const card = createTaskCard(task);
        fragment.append(card);
    });

    // Write all changes into live DOM viewport instantly
    taskList.append(fragment);
    updateStatsAndLocalStorage();
}

/**
 * SYNCHRONIZE LOCALSTORAGE AND STATS COUNTERS (Bonus)
 */
function updateStatsAndLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    const pending = tasks.filter(t => t.status === 'pending').length;
    const completed = tasks.filter(t => t.status === 'completed').length;

    pendingCountEl.innerText = pending;
    completedCountEl.innerText = completed;
}

/**
 * CREATE TASK ON FORM SUBMIT
 */
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!taskTitleInput.value.trim()) return;

    const newTask = {
        id: 'task_' + Date.now(),
        title: taskTitleInput.value.trim(),
        category: taskCategorySelect.value,
        status: 'pending'
    };

    tasks.push(newTask);
    renderTasks();
    
    // Reset fields
    taskTitleInput.value = '';
});

/**
 * EVENT DELEGATION (SINGLE CONTAINER LISTENER)
 */
taskList.addEventListener('click', (e) => {
    // Discover the closest ancestor matching the task-card class wrapper wrapper
    const card = e.target.closest('.task-card');
    if (!card) return;

    // Use getAttribute to check properties
    const taskId = card.getAttribute('data-id');
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    // Handle Delete Operation
    if (e.target.classList.contains('delete-btn')) {
        // Demonstration of required DOM method: remove()
        card.remove(); 
        tasks.splice(taskIndex, 1);
        updateStatsAndLocalStorage();
    }

    // Handle Complete Toggle Operation
    else if (e.target.classList.contains('complete-btn')) {
        const targetTask = tasks[taskIndex];
        targetTask.status = targetTask.status === 'pending' ? 'completed' : 'pending';
        
        // Dynamic Attribute Testing Demo (hasAttribute / removeAttribute / setAttribute)
        if (card.hasAttribute('data-status') && card.getAttribute('data-status') === 'completed') {
            card.setAttribute('data-status', 'pending');
        } else {
            card.removeAttribute('data-status'); // Clean removal demo
            card.setAttribute('data-status', 'completed');
        }

        renderTasks();
    }

    // Handle Inline Edit Operation
    else if (e.target.classList.contains('edit-btn')) {
        const currentTitle = tasks[taskIndex].title;
        const newTitle = prompt("Update your task label text:", currentTitle);
        
        if (newTitle && newTitle.trim() !== "") {
            tasks[taskIndex].title = newTitle.trim();
            
            /* Demonstration of structural mutation methods requested:
              before(), after(), prepend(), replaceWith()
            */
            const updatedCard = createTaskCard(tasks[taskIndex]);
            card.replaceWith(updatedCard); // Seamless element substitution
            
            updateStatsAndLocalStorage();
        }
    }
});

/**
 * THEME TOGGLE FUNCTIONALITY
 */
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
    const htmlElement = document.documentElement;
    // Read active setup configuration through getAttribute
    const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Mutation implementations via attributes and classes
    htmlElement.setAttribute('data-theme', nextTheme);
    htmlElement.dataset.theme = nextTheme; // Dataset mutation sync mirror

    if (nextTheme === 'dark') {
        htmlElement.classList.add('dark-mode-active');
    } else {
        htmlElement.classList.remove('dark-mode-active');
    }
});

/**
 * EVENT PROPAGATION DEMONSTRATION (BUBBLING VS CAPTURING)
 */
const grandparent = document.getElementById('grandparent');
const parent = document.getElementById('parent');
const childBtn = document.getElementById('child-btn');

/*
  EVENT CAPTURING (Phase 1)
  By setting the third parameter to `true`, these listeners fire top-to-bottom:
  Grandparent -> Parent -> Child.
*/
grandparent.addEventListener('click', () => {
    console.log('🔴 Capture Phase: Grandparent');
}, true);

parent.addEventListener('click', () => {
    console.log('🔴 Capture Phase: Parent');
}, true);

childBtn.addEventListener('click', () => {
    console.log('🔴 Capture Phase: Child Button');
}, true);

/*
  EVENT BUBBLING (Phase 3)
  With no third parameter (or setting it to `false`), these listeners fire bottom-to-top:
  Child -> Parent -> Grandparent.
*/
grandparent.addEventListener('click', () => {
    console.log('🔵 Bubbling Phase: Grandparent');
}, false);

parent.addEventListener('click', () => {
    console.log('🔵 Bubbling Phase: Parent');
}, false);

childBtn.addEventListener('click', () => {
    console.log('🔵 Bubbling Phase: Child Button');
}, false);


/**
 * ADDITIONAL BONUS CONTROLS EVENT HANDLERS
 */
searchInput.addEventListener('input', renderTasks);
filterCategory.addEventListener('change', renderTasks);
clearAllBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
        tasks = [];
        renderTasks();
    }
});

// Initial boot initialization call execution loop 
renderTasks();