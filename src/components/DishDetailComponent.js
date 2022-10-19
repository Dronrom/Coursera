import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
   
    renderDish(dish) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else 
            return (
                <div></div>
            )
    }

    renderComments(dish){
        const comments = dish.comments.map((comment, key) => {
            return (
                <div key={key} className="container col-5 col-xs-12 col-sm-12 m-1 list-unstyled">
                    <ul key={dish.comments.id} 
                          onClick={() => this.onDishSelect(comment)}>
                        <p>{comment.comment}</p>
                        { <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p> }
                    </ul>
                </div>
            );
        });
        return(
            <div className="list-unstyled">
            <h4>Comments</h4>
                {comments}
            </div>

        );
       
            
    }
    
    render() {
        console.log(this.props);
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>  
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish)}
                </div>  
            </div>
        );
    }
}

export default DishDetail;