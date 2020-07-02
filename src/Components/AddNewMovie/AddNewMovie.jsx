import React from 'react';
import axios from 'axios';

import './AddNewMovie.css';

class AddNewMovie extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            preview : false,
            title : '',
            year : '',
            rating : '',
            type : '',
            language:'',
            country:'',
            description: '',
            actors: '',
            director: '',
            awards: '',
            imgUrl : 'https://i.pinimg.com/originals/31/d6/fb/31d6fb7595b44e4b649aec2ce079e68a.jpg'
        }
    }
    //collects input data on state
    handleChange =(event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    //renders preview
    handlePreview =(event) => {
        this.setState({ preview : true })
        event.preventDefault();
    }
    //on success closes preview, sends success msg to be rendered on AddPage | error in console
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.props.token)
        const {title, year, imdbID, type, imageUrl} = this.state;
        const headerToken = {
        headers: {'X-Auth-Token': this.props.token}
          };
        axios.post(
            'https://movies-app-siit.herokuapp.com/movies',
            {
                Title: title,
                Year: year,
                imdbID: imdbID,
                Type: type,
                Poster: imageUrl
            },
            headerToken
        ).then(response =>{
            console.log(response)
            if ( response.status === 200){
                this.setState({ 
                    preview : false 
                })
                this.props.onSubmitAdd()
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    
    render(){
        const {title, year, rating, type, imageUrl, language, country, description, actors, director,awards} = this.state;
        
        return(
            <div className='addFormContainer'>
                <form className='addForm'onSubmit={this.handleSubmit}>
                        <div className='addPoster'>
                            <div className='ceva'></div>
                            <label htmlFor='addPoster'>Poster URL:</label>
                            <input type='text' 
                            id='addPoster'
                            name='imageUrl'
                            className='addField addPosterField'
                            value = {imageUrl}
                            />
                            <div className='ceva'></div>
                        </div>

                        <div className='addDetails'>
                            <div className='fieldWrapper'>
                                <label htmlFor='addTitle'>Title*:</label>
                                <input type='text' 
                                    name='title'
                                    id='addTitle'
                                    className='addField'
                                    value={title}
                                    onChange = {this.handleChange}
                                    required
                                />
                            </div>
                            <div className='fieldWrapper'>
                                <label htmlFor='addYear'>Year*:</label>
                                <input type='text' 
                                    name='year'
                                    id='addYear'
                                    className='addField'
                                    value={year}
                                    onChange = {this.handleChange}
                                    required
                                />
                            </div>
                            <div className='fieldWrapper'>
                                <label htmlFor='addType'>Type*:</label>
                                <input  type='text' 
                                        name='type'
                                        id='addType'
                                        className='addField'
                                        value={type}
                                        onChange = {this.handleChange}
                                        required
                                />
                            </div>
                            <div className='fieldWrapper'>
                                <label htmlFor='addDirector'>Director:</label>
                                <input type='text'
                                    name='director' 
                                    id='addDirector'
                                    className='addField'
                                    value={director}
                                    onChange = {this.handleChange}
                                />
                            </div>
                            <div className='fieldWrapper'>
                                <label htmlFor='addLanguage'>Language:</label>
                                <input  type='text' 
                                    name='language'
                                    id='addLanguage'
                                    className='addField'
                                    value={language}
                                    onChange = {this.handleChange}
                                />
                            </div>
                            <div className='fieldWrapper'>
                                <label htmlFor='title'>Country:</label>
                                    <input  type='addCountry' 
                                            name='country'
                                            id='addCountry'
                                            className='addField'
                                            value={country}
                                            onChange = {this.handleChange}
                                    />
                            </div>
                            <div className='fieldWrapper'>
                                <label htmlFor='title'>Actors:</label>
                                    <input  type='addActors' 
                                            name='actors'
                                            id='addActors'
                                            className='addField'
                                            value={actors}
                                            onChange = {this.handleChange}
                                    />
                            </div>
                            <div className='fieldWrapper'>
                                <label htmlFor='addAwards'>Awards:</label>
                                <input  type='text' 
                                        name='awards'
                                        id='addAwards'
                                        className='addField'
                                        value={awards}
                                        onChange = {this.handleChange}
                                />
                            </div>
                            <div className='fieldWrapper'>
                                <label htmlFor='addRating'>Rating*:</label>
                                <input  type='text' 
                                        name='rating'
                                        id='addRating'
                                        className='addField'
                                        value={rating}
                                        onChange = {this.handleChange}
                                        required
                                />
                            </div>
                            <div className='fieldWrapper'>
                                <label htmlFor='addDescription'>Description:</label>
                                <textarea 
                                        name='description'
                                        id='addDescription'
                                        className='addField'
                                        value={description}
                                        onChange = {this.handleChange}
                            
                                />
                            </div>
                        </div>

                        <div className='btnsWrapper'>
                            <button className='pvwBtn'
                                    onClick={this.handlePreview}> PREVIEW </button>
                            <button type='submit'
                                    className='addBtn'> ADD </button>
                            <button className='addBtn'
                                    onClick={this.props.onCancel}> CANCEL </button>
                        </div>
                    </form>
                    
                { this.state.preview && 
                    <div className='pvw'>
                        <img src={this.state.imgUrl} alt='movie poster'/>
                        <div className='pvwDetails'>
                            <h3 className='pvwLine'><span>Title: </span>
                                {this.state.title}</h3>
                            <p className='pvwLine'><span>Released: </span> 
                                {this.state.year}</p>
                            <p className='pvwLine'><span>Type: </span>
                                {this.state.type}</p>
                            <p className='pvwLine'><span>Director: </span>
                                {this.state.director}</p>
                            <p className='pvwLine'><span>Language: </span>
                                {this.state.language}</p>
                            <p className='pvwLine'><span>Country: </span>
                                {this.state.country}</p>
                            <p className='pvwLine'><span>Actors: </span>
                                {this.state.actors}</p>
                            <p className='pvwLine'><span>Awards: </span>
                                {this.state.awards}</p>
                            <p className='pvwLine'><span>Rating: </span>
                                {this.state.rating}</p>
                            <p className='pvwLine'><span>Description: </span>
                                {this.state.description}</p>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default AddNewMovie ;


 