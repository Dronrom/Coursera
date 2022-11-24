import React,{ Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import Menu from './MenuComponent';
import DishDetail from "./DishDetailComponent";
import Footer from './FooterComponent';
import { Routes , Route } from 'react-router';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import About from './AboutComponent';
//The below action creator function in order to obtain an 
//action JavaScript object which we can then dispatch to 
//the store by saying, calling store dispatch. 
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//This mapStateToProps is responsible for getting data from STORE to the COMPONENT in your website.
//It will return an object where the key is the LHS(left hand side) of the : and the value is the RHS of the :.
const mapStateToProps = (state) => {  // The state here is from the redux store. 
    return {
      dishes: state.dishes,
      comments: state.comments,
      leaders: state.leaders,
      promotions: state.promotions
    } //The above will be available to the mainComponent as props now.
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())}, // So the fetchDishes with purple brackets is the thunk that we imported. We are able to dispatch this thunk via the dispatch function.
  //  And now in order to do this, you have to map it to the mapDispatchToProps so that the fetchDishes key becomes available in the Main Component to make use of
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  postFeedback: (formValues) => dispatch(postFeedback(formValues))
   //This mapDispatchToProps is responsible for sending data from COMPONENT in your website to the STORE in redux.
    // This is a function in a function. First input value is a function called dispatch. This then is use in the RHS of the second =>.
    // So when you call the 'postComment' key, a nameless function on the RHS of the : is called from a COMPONENT, it requires input values of (dishID....comments).
    // It will then go to the RHS of => and pass these inputs into the 'postComment' in thr RHS.  
    // that we imported from the ActionCreators. This postComment will return an action Object which will inturn 
    // call the dispatch function to update the store with the new values by first going through the relevant reducer function. 
})

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        location={location}
        params={params}
        navigate={navigate}
      />
    );
  }

  return ComponentWithRouterProp;
}

class Main extends Component {

      // This runs when the Main component is first mounted in the view.
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render () {
    const HomePage = () => {
        return (
            <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                promosLoading={this.props.promotions.isLoading}
                promosErrMess={this.props.promotions.errMess}
                leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} 
                leadersLoading={this.props.leaders.leaders.isLoading}
                leadersErrMess={this.props.leaders.leaders.errMess}       
             />
        )
    }

    const DishWithId = () => {
        const { dishId } = useParams() //Here the const has to be of the same name(exact word) as you put in your route menu/:dishID
        console.log(dishId)
        console.log(this.props.dishes)
        return(
            <DishDetail dish={this.props.dishes.dishes.find((dish) => String(dish.id) === dishId)} 
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.comments}
                CommentsErrMess={this.props.comments.errMess}
                postComment={this.props.postComment}
                //The addComment is the function created above which is passed into the DishDetail component as a third attibute. Now we can use this attribute to dispatch to the store.
            />
        )
    }
    console.log(this.props);
    return (
      <div className="App">
      <Header/>
      <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route exact path="/menu" element={<Menu dishes={this.props.dishes}/>} />
              <Route path="menu/:dishId" element={<DishWithId />}/>
              <Route exact path="/aboutus" element={<About leaders={this.props.leaders}/>} />
              <Route exact path="/contactus" element={<Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
          </Routes>
          </CSSTransition>
      </TransitionGroup>
        {/* <Navigate  to="/" />  */}
        
        {/* <Menu dishes={this.state.dishes}
              onClick={(dishId) => this.onDishSelect(dishId)}
        /> */}
        {/* {this.state.selectedDish && <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />} */}
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
//Here what we do is connect the MainComponent to the Redux Store. 
//The connect will allow the mapStateToProps and mapDispatchToProps to become available in the Main Class here as a prop. 