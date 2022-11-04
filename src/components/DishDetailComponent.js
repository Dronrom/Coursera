import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, Button, BreadcrumbItem, Modal, ModalBody, ModalHeader,Label, Row, Col } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val?.length <= len);
const minLength = (len) => (val) => val || (val?.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this)
    }

    handleSubmit(values) {
        console.log("Current State is"+ JSON.stringify(values))
        alert("Current State is"+ JSON.stringify(values));
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    render() {
        return (
            <>
            <Modal isOpen={this.state?.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm model = "feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select
                                        model=".rating"
                                        id="rating"
                                        name="rating"
                                        className="form-control"
                                        defaultValue="1">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                    <Label htmlFor="author" md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="Author"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }} />
                                            <Errors
                                                className="text-danger"
                                                model=".author"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    minLegth: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea
                                        model=".comment"
                                        id="comment"
                                        name="comment"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                                </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
            </Modal>
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"> </span> Submit Comment
            </Button>
            </>
        )
    }
}    


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
            <div className="container list-unstyled">
            <h4>Comments</h4>
                {comments1}
                <CommentForm />
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