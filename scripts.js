
// creating app elements
const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.jpg'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)


function getMoviesList() {
    // work with request
    var request = new XMLHttpRequest()

    request.open('GET', 'https://yts.lt/api/v2/list_movies.json', true)

    request.onload = function () {
        var result = JSON.parse(this.response)
        var status = result.status
        var statusMsg = result.status_message

        if (request.status >= 200 && request.status < 400) {
            var data = result.data
            var movies = data.movies
            var movieCount = data.movie_count

            const p = document.createElement('p')
            p.textContent = 'This is the list of movies from YIFI.'
            
            app.appendChild(p)

            movies.forEach(movie => {
                // Create a div with a card class
                const card = document.createElement('div')
                card.setAttribute('class', 'card')

                // Create an h1 and set the text content to the film's title
                const h1 = document.createElement('h1')
                h1.textContent = movie.title

                // Create a p and set the text content to the film's description
                const p = document.createElement('p')
                movie.description = movie.description_full.substring(0, 300) // Limit to 300 chars
                p.textContent = `${movie.description_full}...` // End with an ellipses

                // Append the cards to the container element
                container.appendChild(card)

                // Each card will contain an h1 and a p
                card.appendChild(h1)
                card.appendChild(p)
            })
        } else {
            const errorMessage = document.createElement('marquee')
            errorMessage.textContent = `It's not working!`
            app.appendChild(errorMessage)
        }
    }

    request.send()
}