const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
    // Launch the Electron app
    const electronApp = await electron.launch({ args: ['.'] });
    try {
        const window = await electronApp.firstWindow();
        const taskText = `E2E task ${Date.now()}`;
        const todoItem = window.locator('.todo-item').filter({ hasText: taskText });

        await window.locator('#todo-input').fill(taskText);
        await window.locator('#add-todo-btn').click();
        await expect(todoItem).toContainText(taskText);

        await todoItem.locator('input[type="checkbox"]').click();
        await expect(todoItem).toHaveClass(/completed/);

        await todoItem.locator('.delete-btn').click();
        await expect(todoItem).toHaveCount(0);
    } finally {
        await electronApp.close();
    }
});
