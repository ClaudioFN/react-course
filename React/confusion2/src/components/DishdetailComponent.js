import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    renderDish(dish) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }else{
            return(
                <div>HOHO</div>
            )
        }
    }

    renderComment(comments){
        if (comments != null) {
            const comment = comments.map((com) => {
                return (
                    <div className='col-12 col-md-5 m-1'>
                        <Card>
                            <CardBody>
                                <CardTitle>{com.author}</CardTitle>
                                <CardText>{com.comment}</CardText>
                                <CardText>{new Intl.DateTimeFormat().format(new Date(com.date))}</CardText>
                                <CardText>{com.rating} &#11088; </CardText> 
                            </CardBody>
                        </Card>
                    </div>
                );
            });

            return (
                <div className='col-12 col-md-5 m-1'>
                    <h4> Comments </h4>
                    <p> {comment} </p> 
                </div>
            );
        }else{
            return(
                <div>HIHI</div>
            )
        }
    }

    render(){
        
        const dish = this.props.dish;
        if(dish == null){
            return(<div>HAHA</div>);
        }
        const dishesToShow = this.renderDish(dish);
        const dishComments = this.renderComment(dish.comments);
        return( 
            <div className='row'>
                {dishesToShow}
                {dishComments}
            </div>
        );
    }    

}

export default DishDetail;