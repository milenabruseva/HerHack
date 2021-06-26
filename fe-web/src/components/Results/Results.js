import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import axios from 'axios';

export default function Results() {
    const [data,setData]=useState({
        title:'',
        date:'',
        subreddit:'',
        num_commnets:'',
        score:'',
        url:'',
        body:''
    })
    useEffect(()=>{
        axios.get('http://164.90.163.136/app/search?searchquery=GME&startdate=2021-01-24%2002:33:15&enddate=2021-01-27%2002:33:15')
            .then(res=>{
                let prefix=res.data.hits.hits;
                var arr = [];
                Object.keys(prefix).forEach(function(key) {
                arr.push(prefix[key]);
                });
                console.log('Home Data: ', arr)
                {arr.map(prefix => (
                    setData({title:prefix._source.title,date:prefix._source.date,subreddit:prefix._source.subreddit,num_comments:prefix._source.num_comments,score:prefix._source.score,url:prefix._source.url,body:prefix._source.body})
                ))}
                
            })
            .catch(err=>{
                console.log(err);
            })
    },[])
    
    return (
        <main className="results">
            <Container>
                <h1>ToTheM00n Search Results 💎 👐 💎 👐 💎 👐 💎 👐💎</h1>
                <div>
                <h5>{data.title}</h5>
                <p>Date: {data.date}</p>
                <p>Subreddit: {data.subreddit}</p>
                <p>Number of Comments: {data.num_comments}</p>
                <p>Number of Upvotes: {data.score}</p>
                <p>url: {data.url}</p>
                <p>{data.body}</p>
            </div>
            </Container>
        </main>
    )
}
