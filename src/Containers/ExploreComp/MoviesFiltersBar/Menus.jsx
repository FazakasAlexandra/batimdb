import React from 'react'
import './Menus.css'
import '../../../Fontawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdowns } from './Menus/Dropdowns.jsx'


export class Menus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuOn: false
        }
    }

    render() {
        let { menuOn } = this.state
        return (
            <>
            {/* large menu */}
                <div className='dropdown-menus-container'>
                    <Dropdowns
                        filterMovies={(filterClass, filter) => this.props.filter(filterClass, filter)}
                        filterMoviesByRange={(filter, value) => this.props.filterMoviesByRange(filter, value)}
                    />
                </div>

            {/* small menu */}
                <>
                    <span className="bars-container">
                        <FontAwesomeIcon icon={'bars'} onClick={() => { this.setState({ menuOn: !menuOn }) }} />
                    </span>
                    <div className='small-dropdown-menus-container' style={{ display: menuOn ? 'flex' : 'none' }}>
                        <Dropdowns
                            filter={(filterClass, filter) => this.props.filter(filterClass, filter)}
                            filterMoviesByRange={(filter, value) => this.props.filterMoviesByRange(filter, value)}
                        />
                    </div>
                </>
            </>
        )
    }
}
