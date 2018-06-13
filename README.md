# Professional-pagination-using-react-without-JSX
This project uses AJAX request to fetch data and then creates a pagination list based on how many items you've set for each page.

Because this considers as a small project and in order for user to be able to add it in a bigger project which isn't based on react, I've skipped JSX and added dependencies manually to the project. So you can easily add it to your project and it will work as I call it a plug and play project.

**BUT** you need to change your needs in `custom.js`

    this.state = {
		posts: [],
		currentPage: 1,
		postsPerPage: 2,
		pageCount: 0,
		pageNumbers2Display: 5, //Set an odd number > 1
    };

Take a look at a sample you'll get with this code:
![react pagination](https://raw.githubusercontent.com/alexjolig/Professional-pagination-using-react-without-JSX/master/React-App.png)

There' no extra info to add. Enjoy!
