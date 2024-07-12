class ApiController{

    async post(data, url){
        let rta;

        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL+url}`, 
            {method: 'POST', headers: {"Content-Type": "application/json", 'Authorization': `${localStorage.getItem('token')}`}, 
            body: JSON.stringify(data)})
                .then(response => response.json())
                .then(data => rta = data)
                .catch(error => {
                    console.log(error);
                    rta = {message: "Problemas de conexión, por favor revisa tu internet"};
                });

        return rta;
    }

    async patch(data, url){
        let rta;
        
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL+url}`, 
            {method: 'PATCH', headers: {"Content-Type": "application/json", 'Authorization': `${localStorage.getItem('token')}`}, 
            body: JSON.stringify(data)})
                .then(response => response.json())
                .then(data => rta = data)
                .catch(error => {
                    console.log(error);
                    rta = {message: "Problemas de conexión, por favor revisa tu internet"};
                });

        return rta;
    }

    async get(url){
        let rta;
        
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL+url}`, 
            {method: 'GET', headers: {'Authorization': `${localStorage.getItem('token')}`}})
                .then(response => response.json())
                .then(data => rta = data)
                .catch(error => {
                    console.log(error);
                    rta = {message: "Problemas de conexión, por favor revisa tu internet"};
                });

        return rta;
    }

    async delete(url){
        let rta;

        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL+url}`, 
            {method: 'DELETE', headers: {'Authorization': `${localStorage.getItem('token')}`}})
                .then(response => response.json())
                .then(data => rta = data)
                .catch(error => {
                    console.log(error);
                    rta = {message: "Problemas de conexión, por favor revisa tu internet"};
                });

        return rta;
    }

}

module.exports = ApiController;