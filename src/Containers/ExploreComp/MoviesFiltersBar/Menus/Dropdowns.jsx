import React from 'react'
import '../Menus.css'
import '../../../../Fontawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Filter} from './Filter'
import dropdowns from './dropdowns.json'

export class Dropdowns extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropdowns 
        }
    }

    getDropdownArrow(dropdownName, dropdownOn, i){
        return <div className="dropdown-menu">
                    <p className={dropdownOn ? 
                                  'filterClass-highlight' : 
                                  'filterClass'}>
                        { dropdownName }
                    </p>

                    <FontAwesomeIcon icon={dropdownOn ? 
                                    "angle-down" :
                                    "angle-right"} 
                                    onClick={()=>{
                                        this.setState([...dropdowns].map((dropdown, idx)=>{
                                            if(idx === i) dropdown.dropdownOn = !dropdown.dropdownOn
                                            return dropdown
                                        }))
                                    }}/>
                </div>
    }

    wrapDropdown(filterComponents, dropdownName, dropdownOn, arrow){
        let wrapedDropdown = React.createElement(
            'div', 
            {id: dropdownOn ? `${dropdownName}-filters-display` : `${dropdownName}-filters-hide`}, 
             filterComponents
        )
        wrapedDropdown = this.wrapDdAndArr(wrapedDropdown, arrow)
        return wrapedDropdown
        return (<div>
            {filterComponents}
        </div>)
    }

    wrapDdAndArr(wrapedDropdown, arrow){
        let wraper = React.createElement(
            'div',
            {class:'dropdown-menu-container'},          
             arrow,
             wrapedDropdown
        )
        return wraper
    }

    turnFilterOn(dropdownNr, filterNr){
        this.setState([...dropdowns].map((dropdown, i)=>{
            if(i === dropdownNr){
                dropdown.filters.map((filter, idx)=>{
                    if(idx === filterNr) {
                        filter.filterOn = !filter.filterOn
                    } else if (idx !== filterNr && filter.filterOn){
                        filter.filterOn = !filter.filterOn
                    }
                    return filter
                })
            }
            return dropdown
        }))
    }

    checkActiveFilters() {
        let {dropdowns} = this.state
        let queryElements = []

        dropdowns.forEach((dropdown, i)=> {
            let {dropdownName, dropdownOn, filters} = dropdown
            let filterWithInput = dropdownName === 'Year' || dropdownName ==='Ratings'

            if (dropdownOn) {
                filters.forEach((filter, idx) => {
                    let {filterName, filterOn} = filter

                    if (filterOn) {
                        queryElements.push(dropdownName === 'Ratings' ? 'imdbRating' : dropdownName, '=')
                        console.log('filter is on')
                        if(filterWithInput) {
                            queryElements.push(dropdowns[i].filters[idx].value, '&')
                        } else {
                            queryElements.push(filterName, '&')
                        }
                    }
                })
            }
        })
        this.sendQuery(queryElements)
    }

    sendQuery(queryElements){
        queryElements.pop()
        let query = queryElements.join("")
        console.log(query)

        this.props.filterMovies(query)
    }

    addValueToJson(value, dropdownNr, filterNr ) {
        let filter = {...this.state.dropdowns[dropdownNr].filters[filterNr]}
        filter.value = value
        this.setState([...dropdowns].map((dropdown, i) =>{
            if(i === dropdownNr){
                dropdown.filters[filterNr] = filter
            }
            return dropdown
        }))
    }

    getDropdowns() {
        let dropdownComponents=[]
        let {props} = this

        for(let i = 0; i < this.state.dropdowns.length; i++){
            let {dropdownOn, dropdownName, filters} = dropdowns[i]
            
            let arrow = this.getDropdownArrow(dropdownName, dropdownOn, i)

            let filterComponents = filters.map((filter, idx)=>{
                let {filterName, filterOn, minYear, maxYear, minRating, maxRating, step} = filter
                return (
                        <Filter
                        filterClass={dropdownName}
                        filterClassOn={dropdownOn}
                        name={filterName}
                        filterOn={filterOn}

                        filterNumber={idx}
                        turnFilterOn={(idx)=>this.turnFilterOn(i, idx)}

                        addValueToJson={(value)=>{this.addValueToJson(value, i, idx)}}
                        filterMovies={()=>{this.checkActiveFilters()}}
                        filterMoviesByRange={(filterName)=>{this.checkActiveFilters(filterName)}}
                        
                        minFilterYear = {minYear}
                        maxFilterYear = {maxYear}
                        minFilterRating = {minRating}
                        maxFilterRating = {maxRating}
                        step={filterName == 'imdb' ? step : null}
                      />
                    )
            })
            let wrapedDropdown = this.wrapDropdown(filterComponents, dropdownName, dropdownOn, arrow)
            dropdownComponents.push(wrapedDropdown)
        }

        return dropdownComponents
    }


    render() {
        return (
            <>
            {this.getDropdowns()}
            </>
        )
    }
}