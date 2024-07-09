import React from 'react'
import '../Assets/css/Pagenotfound.css'
import { useSelector } from 'react-redux'
import{Link} from 'react-router-dom'

export default function PageNotFound() {
    const stateData=useSelector(state=>state.authenticate);
    const id=stateData.userInfo.uid;
  return (
    <section class="page_404">
	<div class="container">
		<div class="row">	
		<div class="col-sm-12 ">
		<div class="col-sm-10 col-sm-offset-1  text-center">
		<div class="four_zero_four_bg">
			<h1 class="text-center ">404</h1>
		
		
		</div>
		
		<div class="contant_box_404">
		<h3 class="h2 text-purple-700">
		Look like you're lost
		</h3>
		
		<p>The page you are looking for not <span class="text-orange-700">available !</span></p>
		
        {stateData.isLoggedin==true && stateData.userInfo.usertype=='user'?(<Link to={`/users/${id}`} class="link_404">Go to Home</Link>):(stateData.isLoggedin==true && stateData.userInfo.usertype=='vendor'?(<Link to={`/vendors/${id}`} class="link_404">Go to Home</Link>):(<Link to="/" class="link_404">Go to Home</Link>))}

	</div>
		</div>
		</div>
		</div>
	</div>
</section>
  )
}
