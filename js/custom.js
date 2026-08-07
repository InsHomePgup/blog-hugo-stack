document.addEventListener('DOMContentLoaded', function() {
    const mainMenu = document.getElementById('main-menu');
    if (!mainMenu) return;

    const menuOrder = ['Home', 'Search', 'Archives', 'Links', 'About'];
    const menuItems = Array.from(mainMenu.children);
    const bottomSection = mainMenu.querySelector('.menu-bottom-section');

    // Create a map for quick lookup
    const menuItemMap = new Map();
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            const name = link.querySelector('span').textContent.trim();
            menuItemMap.set(name, item);
        }
    });

    // Clear the menu
    while (mainMenu.firstChild && mainMenu.firstChild !== bottomSection) {
        mainMenu.removeChild(mainMenu.firstChild);
    }

    // Re-add items in the correct order
    menuOrder.forEach(name => {
        const item = menuItemMap.get(name);
        if (item) {
            mainMenu.insertBefore(item, bottomSection);
        }
    });
});