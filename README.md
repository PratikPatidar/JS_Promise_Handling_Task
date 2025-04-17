# 📦 Promise Queue Visualizer
This is a simple JavaScript-based UI project to help visualize how JavaScript Promises work sequentially. It features a progress bar powered by requestAnimationFrame, and provides interactive control over promise execution and UI state.

🧩 Features
✅ Three Promise Buttons:

5 Second button

10 Second button

15 Second button
Each button creates a promise with the respective timeout duration and adds it to a queue for sequential execution.

🕗 Promise Queueing:
If one promise is already running, the new one will wait in a pending list until the current one finishes.

🟡 Pending & Resolved Sections:

Promises waiting in line appear in the Pending list.

Once resolved, they move to the Resolved section.

🧼 Control Buttons:

Clear Current: Immediately resolve the current running promise.

Clear All: Stop all promises and reset the UI to its original clean state.

🟩 Progress Bar:
A smooth animated progress bar shows the progress of the current running promise using requestAnimationFrame.

⚙️ Technologies Used
HTML for structure

CSS for styling and transitions

JavaScript for handling promises, DOM updates, and the animation frame logic


📌 How it Works
Click any of the 5/10/15 second buttons to create a promise.

It starts immediately if no promise is running.

Others will queue in the Pending section.

The progress bar animates based on the promise duration.

Once completed, the promise moves to the Resolved section.

Use Clear Current or Clear All to manage the queue and UI.
