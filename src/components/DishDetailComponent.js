import React from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { COMMENTS } from "../shared/comments";

    function RenderDish({dish}) {
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

    function RenderComments({dish, comments}){
        console.log(comments)
        const comments1 = comments.map((comment, key) => {
            if (comment.dishId !== dish.id) return null;
            return (
                <div key={key} className="container col-5 col-xs-12 col-sm-12 m-1 list-unstyled">
                    <ul key={comment.id} 
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
                {comments1}
            </div>

        );
       
            
    }
    
    const DishDetail = (props) => {
        console.log(props)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>  
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments dish={props.dish} comments={props.comments}/>
                    </div>  
                </div>
            </div>
        );
    }


export default DishDetail;