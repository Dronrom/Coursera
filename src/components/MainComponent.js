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
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = (state) => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      leaders: state.leaders,
      promotions: state.promotions
    }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  postFeedback: (formValues) => dispatch(postFeedback(formValues))
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
        const { dishId } = useParams()
        console.log(dishId)
        console.log(this.props.dishes)
        return(
            <DishDetail dish={this.props.dishes.dishes.find((dish) => String(dish.id) === dishId)} 
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.comments}
                CommentsErrMess={this.props.comments.errMess}
                postComment={this.props.postComment}
            />
        )
    }

    return (
      <div className="App">
      <Header/>
      <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Routes>
              <Route path="/home" element={<HomePage/>} />
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
