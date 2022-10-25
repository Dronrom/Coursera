import React,{ Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import Menu from './MenuComponent';
import DishDetail from "./DishDetailComponent";
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { Routes , Route, Navigate  } from 'react-router';



class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  render () {
    const HomePage = () => {
        return (
            <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                leader={this.state.leaders.filter((leader) => leader.featured)[0]}        
             />
        )
    }

    return (
      <div className="App">
        <Header/>
        <Routes>
            <Route path="/home" element={<HomePage/>} />
            <Route exact path="/menu" element={<Menu dishes={this.state.dishes}/>} />
            <Route exact path="/contactus" element={<Contact />} />
        </Routes>
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

export default Main;
