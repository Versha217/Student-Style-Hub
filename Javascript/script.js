const bar=document.getElementById('bar');
const close=document.getElementById('close');
const nav=document.getElementById('navbar');

if(bar){
	bar.addEventListener('click',()=>{
		nav.classList.add('active');
	})
}

if(close){
	close.addEventListener('click',()=>{
		nav.classList.remove('active');
	})
}



/* Blog page */

		/*for reading more or less */
document.querySelectorAll('.read-more-btn').forEach(function(btn) {
  btn.addEventListener('click', function(event) {
    event.preventDefault();
    var excerpt = this.previousElementSibling;
    var fullContent = excerpt.querySelector('.full-content');
    if (fullContent.classList.contains('hidden')) {
      fullContent.classList.remove('hidden');
      this.textContent = 'Read Less';
    } else {
      fullContent.classList.add('hidden');
      this.textContent = 'CONTINUE READING';
    }
  });
});




/* blog-links */


function showBlogs(link) {
    // Hide all blogs
    var blogs = document.querySelectorAll('.blogs');
    blogs.forEach(function(blog) {
        blog.style.display = 'none';
    });

    // Show blogs for the clicked link
    var selectedBlogs = document.querySelector('.blogs.' + link);
    selectedBlogs.style.display = 'block';
}











