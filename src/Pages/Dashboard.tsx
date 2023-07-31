import React, { useEffect, useState } from "react";
import { Dropdown } from "../Components/Shared/Dropdown";
import { AppData, AppDetails } from "../data/webAppData";
import AppChart from "../Components/Dashboard/AppChart";


function extractUniqueCategories(apps: AppDetails[]): string[] {
    const categories: string[] = ["All"];

    apps.forEach((app) => {
        if (!categories.includes(app.category)) {
            categories.push(app.category);
        }
    });

    return categories;
}

function extractUniqueContentRatings(apps: AppDetails[]): string[] {
    const contentRatings: string[] = ["All"];

    apps.forEach((app) => {
        if (!contentRatings.includes(app.contentRating)) {
            contentRatings.push(app.contentRating);
        }
    });

    return contentRatings;
}

type FilterOptions = {
    [filter:string]:{
        text: string ,
        value? : number
    }[]
}

const filterOptions:FilterOptions = {
    category : extractUniqueCategories(AppData).map((category) => ({text: category})),
    rating: [
        {text:"All"},
        {text: ">=3",value: 3},
        {text: ">=3.5",value: 3.5},
        {text: ">=4",value: 4},
        {text: ">=4.5",value:4.5}
    ],
    reviews: [
        {text:"All"},
        {text:">=50",value: 50},
        {text:">=100",value: 100},
        {text:">=500",value: 500},
        {text:">=1000",value: 1000},
        {text:">=5000",value: 1000},
        {text:">=10000",value: 1000},
    ],
    installs:[
        {text:"All"},
        {text:">=10000",value: 10000},
        {text:">=50000",value: 50000},
        {text:">=100000",value: 100000},
        {text:">=500000",value: 500000},
        {text:">=10000000",value: 10000000},
        {text:">=100000000",value: 100000000},
    ],
    type:[
        {text:"All"},
        {text:"Paid"},
        {text: "Free"}
    ],
    contentRating: extractUniqueContentRatings(AppData).map((contentRating) => ({text: contentRating}))
}

export type Filter = {
    text: string,
    value?: number
}

const equalStringFilterFn = (currStr: string,filter:string)=>{
    if(filter==="All"){
        return true
    }
    return currStr===filter
}

const comparisonNumberFilterFn = (currNum:number,filterText: string,filterVal:number|undefined)=>{
    if(filterText==="All"){
        return true
    }
    return filterVal && currNum>=filterVal
}

export function Dashboard() {
    // filter states
    const [categoryFilter,setCategoryFilter] = useState<Filter>({text:"All"})
    const [ratingFilter,setRatingFilter] = useState<Filter>({text:"All"})
    const [reviewsFilter,setReviewsFilter] = useState<Filter>({text:"All"})
    const [installsFilter,setInstallsFilter] = useState<Filter>({text:"All"})
    const [typeFilter,setTypeFilter] = useState<Filter>({text:"All"})
    const [contentRatingFilter,setContentRatingFilter] = useState<Filter>({text:"All"})

    const [appData,setAppData] = useState(AppData)

    useEffect(()=>{
        setAppData(()=>{
            const categoryFilteredData = AppData.filter(data => equalStringFilterFn(data.category,categoryFilter.text))
            const contentRatingFilteredData = categoryFilteredData.filter(data => equalStringFilterFn(data.contentRating,contentRatingFilter.text))
            const ratingFilteredData = contentRatingFilteredData.filter(data => comparisonNumberFilterFn(data.rating,ratingFilter.text,ratingFilter.value))
            const reviewsFilteredData = ratingFilteredData.filter(data => comparisonNumberFilterFn(data.reviews,reviewsFilter.text,reviewsFilter.value))
            const installsFilteredData = reviewsFilteredData.filter(data => comparisonNumberFilterFn(data.installs,installsFilter.text,installsFilter.value))
            const typeFilteredData = installsFilteredData.filter(data=>equalStringFilterFn(data.type,typeFilter.text))

            return typeFilteredData
        })
    },[ratingFilter,categoryFilter,reviewsFilter,installsFilter,typeFilter,contentRatingFilter])

    useEffect(()=>{
        console.log("appData = ",appData)
    },[appData])

    return (
        <div className="mx-auto px-2 sm:px-12 py-10">

            <div className="mb-10 text-center md:text-start">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Dashboard</h1>
            </div>
            <div className="flex flex-wrap md:justify-start justify-center">
                <div className="min-w-[13rem] mr-4 mb-5">
                    <Dropdown 
                        title={"Category"}
                        setFilter={setCategoryFilter}
                        filterOptions={filterOptions["category"]}
                        selectedFilter={categoryFilter}
                    />
                </div>
                <div className="min-w-[13rem] mr-4 mb-5">
                    <Dropdown 
                        title={"Rating"}
                        setFilter={setRatingFilter}
                        filterOptions={filterOptions["rating"]}
                        selectedFilter={ratingFilter}
                    />
                </div>
                <div className="min-w-[13rem] mr-4 mb-5">
                    <Dropdown 
                        title={"Reviews"}
                        setFilter={setReviewsFilter}
                        filterOptions={filterOptions["reviews"]}
                        selectedFilter={reviewsFilter}
                    />
                </div>
                <div className="min-w-[13rem] mr-4 mb-5">
                    <Dropdown 
                        title={"Installations"}
                        setFilter={setInstallsFilter}
                        filterOptions={filterOptions["installs"]}
                        selectedFilter={installsFilter}
                    />
                </div>
                <div className="min-w-[13rem] mr-4 mb-5">
                    <Dropdown 
                        title={"Type"}
                        setFilter={setTypeFilter}
                        filterOptions={filterOptions["type"]}
                        selectedFilter={typeFilter}
                    />
                </div>
                <div className="min-w-[13rem] mr-4 mb-5">
                    <Dropdown 
                        title={"Content Rating"}
                        setFilter={setContentRatingFilter}
                        filterOptions={filterOptions["contentRating"]}
                        selectedFilter={contentRatingFilter}
                    />
                </div>
                
            </div>
            <div className="mt-10">
                {appData.length>0
                ? <AppChart appData={appData} />
                : <p>No apps are present for the above combination of filters</p>
                }
                
            </div>

        </div>
    )
}