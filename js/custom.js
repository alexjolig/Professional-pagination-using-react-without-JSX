 /*
	Professional pagination with react without JSX
	Developer: Alex Jolig
	Licence:MIT
	Source: https://github.com/alexjolig/Professional-pagination-using-react-without-JSX.git
	Contact me if you need to: alex.jolig@gmail.com
	
	For a simpler solution check this one:
	https://github.com/alexjolig/react-pagination-without-jsx
 */
	
 class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		posts: [],
		currentPage: 1,
		postsPerPage: 2,
		pageCount: 0,
		pageNumbers2Display: 5, //Set an odd number > 1
    };
	this.handleClick = this.handleClick.bind(this);
	this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
	
	fetch('generated.json').then(function (response) {
			return response.json();
	}).then(result => {
        this.setState({
			posts: result
		});
		this.setState({
			pageCount: Math.ceil(this.state.posts.length / this.state.postsPerPage)
		});
	});
	
  }
	
	//Handle click on page number list
	handleClick(event) {
		this.setState({
		  currentPage: Number(event.currentTarget.id) //using event.target would reference to child tag (a). So use event.currentTarget 
		});
		event.preventDefault();
	}

	//Handle next and previous buttons
	changePage(event) {
		event.preventDefault();
		let newPage = 1;
		if(event.currentTarget.id === 'p-page') { //previous
			newPage = this.state.currentPage > 1 ? this.state.currentPage - 1 : 1;
			this.setState({
			  currentPage: newPage
			});
		}
		else if(event.currentTarget.id === 'n-page') { //next		
			newPage = this.state.currentPage < this.state.pageCount ? this.state.currentPage + 1 : this.state.pageCount;
			this.setState({
			  currentPage: newPage
			});			
		}
		else if(event.currentTarget.id === 'f-page') { //first		
			newPage = 1;
			this.setState({
			  currentPage: newPage
			});			
		}
		else if(event.currentTarget.id === 'l-page') { //last		
			newPage = this.state.pageCount;
			this.setState({
			  currentPage: newPage
			});			
		}
		else if(event.currentTarget.id === 'e-dots') { //last dots
			let extraPages2Jump = 3;
			let page2JumpFrom = this.state.currentPage <= this.state.pageNumbers2Display ? this.state.pageNumbers2Display : this.state.currentPage + 2;
			newPage = page2JumpFrom + extraPages2Jump <= this.state.pageCount ? page2JumpFrom + extraPages2Jump : this.state.currentPage;
			this.setState({
			  currentPage: newPage
			});			
		}
		else { //first dots 'f-dots'
			let extraPages2Jump = 3;
			let page2JumpFrom = this.state.currentPage >= this.state.pageCount - (this.state.pageNumbers2Display - 1) ? this.state.pageCount - (this.state.pageNumbers2Display - 1) :  this.state.currentPage - 2;
			newPage = page2JumpFrom - 3 >= 1 ? page2JumpFrom - 3 : 1;
			this.setState({
			  currentPage: newPage
			});			
		}		
	} 
	  
	render() {
		
		const { posts, currentPage, postsPerPage, pageCount, pageNumbers2Display } = this.state;
		const ce = React.createElement;
		
        // Logic for displaying current posts
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);		

        const renderPosts = currentPosts.map((post, index) => {
			return ce('li', {key: post.index},
			  ce('h2', {}, post.name),
			  ce('a', {href: post.phone}, post.phone)
			)
        });		
		
        // Logic for displaying page numbers
		
		//for pages less than twice as mush as pageNumbers2Display, display all the page numbers,
		//cause its pointless to show extra buttons in this case scenarios 
		const shouldDisplayExtraButtons = pageCount - pageNumbers2Display >= pageNumbers2Display;
		function getPageNumberList() {
			const list = [];
			
			if(shouldDisplayExtraButtons) {
				let i = currentPage <= pageNumbers2Display ? 1 : 
							currentPage + pageNumbers2Display > pageCount ? pageCount - (pageNumbers2Display - 1) :
								currentPage - (Math.floor(pageNumbers2Display / 2));
								
				let toNumber = i + pageNumbers2Display;
								
				for (i; i < toNumber; i++) {
				  list.push(i);
				}
			}
			else {
				for (let i = 1; i <= Math.ceil(pageCount); i++) {
				  list.push(i);
				}				
			}

			return list;
		}
		
		const prevPage = ce(
            'li', {	className: 'page-item',
					key:'p-page',
					id: 'p-page',
					onClick: this.changePage
				},
			ce('a', {	className: 'page-link',
										href: '#'
									}, '<'
			)
          );
		  
		const nextPage = ce(
            'li', {	className: 'page-item',
					key:'n-page',
					id: 'n-page',
					onClick: this.changePage
				},
			ce('a', {	className: 'page-link',
										href: '#'
									}, '>'
			)
          );

		class FirstPage extends React.Component {
		  render() {
			  
			if((currentPage > pageNumbers2Display) && shouldDisplayExtraButtons) {
				return ce(
					'li', {	className: 'page-item' + (currentPage === 1 ? ' active' : ''),
							key:'f-page',
							id: 'f-page',
							onClick: this.props.changeP
						},
					ce('a', {	className: 'page-link',
												href: '#'
											}, '1'
					)
				)
			}
			else
				return null;
		  }
		}	
		
		FirstPage.propTypes = {
		  changeP: PropTypes.func
		};

		class LastPage extends React.Component {
		  render() {
			  
			if((currentPage < pageCount - (pageNumbers2Display - 1)) && shouldDisplayExtraButtons) {
				return ce(
					'li', {	className: 'page-item' + (currentPage === pageCount ? ' active' : ''),
							key:'l-page',
							id: 'l-page',
							onClick: this.props.changeP
						},
					ce('a', {	className: 'page-link',
												href: '#'
											}, pageCount
					)
				)
			}
			else
				return null;
		  }
		}	
		
		LastPage.propTypes = {
		  changeP: PropTypes.func
		};
		
		class StartDots extends React.Component {
			render() {
				if((currentPage > pageNumbers2Display) && shouldDisplayExtraButtons) {
					return ce(
						'li', {	className: 'page-item',
								key:'sdots',
								id: 's-dots',
								onClick: this.props.changeP
							},
						ce('a', {	className: 'page-link',
													href: '#'
												}, '...'
						)
					);
					
				}
				else
					return null;
			}
		}
		StartDots.propTypes = {
			changeP: PropTypes.func
		}

		class EndDots extends React.Component {
			render() {
				if((currentPage < pageCount - (pageNumbers2Display - 1)) && shouldDisplayExtraButtons) {
					return ce(
						'li', {	className: 'page-item',
								key:'edots',
								id: 'e-dots',
								onClick: this.props.changeP
							},
						ce('a', {	className: 'page-link',
													href: '#'
												}, '...'
						)
					);
					
				}
				else
					return null;
			}
		}
		EndDots.propTypes = {
			changeP: PropTypes.func
		}		

        const renderPageNumbers = getPageNumberList().map(number => {
          return ce(
            'li', {	className: 'page-item' + (currentPage === number ? ' active' : '') ,
					key:number,
					id: number,
					onClick: this.handleClick
				},
			ce('a', {	className: 'page-link',
										href: '#'
									}, number
			)
          );
        });	

		class PaginationSection extends React.Component {
			render() {
				if(pageCount > 1) {
					return 	ce('div', {className: 'row'},
								ce('ul', {className: 'pagination',key: 'b'},
									prevPage,
									ce(FirstPage, {changeP: this.props.changeP}),
									ce(StartDots, {changeP: this.props.changeP}),
									renderPageNumbers,
									ce(EndDots, {changeP: this.props.changeP}),
									ce(LastPage, {changeP: this.props.changeP}),
									nextPage										
								)	
							)
					
				}
				else
					return null;
			}
		}
		PaginationSection.propTypes = {
			changeP: PropTypes.func
		}
		
		return ce(React.Fragment, null,
			ce('div', {className: 'row'},
				ce('ul', {key:'a'}, renderPosts)
			),
			ce(PaginationSection, {changeP: this.changePage})
		)			
	}
 }

ReactDOM.render(
	React.createElement(ImageGallery),
	document.getElementById('root')
);