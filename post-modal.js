document.addEventListener('DOMContentLoaded', function () {
    // get modal
    const modal = document.getElementById('newPostModal');

    // get button that opens the modal
    const plusButton = document.getElementById('plusButton');

    // get button that opens the modal
    const closeForm = document.getElementById('closeForm');

    // when the user clicks the plus button this will open the modal
    plusButton.onclick = function() {
        modal.style.display = 'block';
    };

    // when user clicks close button on Modal it closes
    closeForm.onclick = function() {
        modal.style.display = 'none';
    };

    // closes the modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // submit the form (might need to change or update when connected to db)
    document.getElementById('newPostForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // add whatever is needed to save to db??

        // close modal
        closeModal(); 
    });
});

