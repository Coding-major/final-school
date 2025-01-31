export const baseUrl = "http://localhost:4000/api/v1"

export const postRequest = async(url, body) => {
    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body),
        credentials: 'include'
    })

    const data = await response.json()
    const status = response.status
    const message = data.msg
    
    

    if (!response.ok) {
        return {error: true, message, status}
    }

    return message
}


export const postRequestFormData = async(url, body) => {
    
    const response = await fetch(url, {
        method: "POST",
        body: body,
    })

    const data = await response.json()
    const status = response.status
    const message = data.msg
    

    if (!response.ok) {
        return {error: true, message, status}
    }

    return message
}

export const getRequest = async (url) => {
    const response = await fetch(url, {
        credentials: 'include'
    })

    const data = await response.json()
    const message = data.msg
    console.log(message);
    
    
    

    if (!response.ok) {
        return {error: true, message}
    }

    return message
}


export const deleteRequest = async(url) => {
    
    const response = await fetch(url, {
        method: "delete",
        headers: {
            "Content-Type" : "application/json"
        },
        credentials: 'include'
    })

    const data = await response.json()
    const status = response.status
    const message = data.msg
    
    

    if (!response.ok) {
        return {error: true, message, status}
    }

    return message
}


export const updateRequest = async (url, body) => {
    try {
        const response = await fetch(url, {
            method: "PATCH", // Use PATCH for partial updates, or PUT for full replacements
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(body) // Convert body object to JSON string
        });

        const data = await response.json();
        const status = response.status;
        
        if (!response.ok) {
            return { error: true, message: data.msg || "Update failed", status };
        }

        return { success: true, data, status }; // Return the updated data
    } catch (error) {
        return { error: true, message: "Network error", status: 500 };
    }
};





// app.get('/api/products', async (req, res) => {
//     const { limit } = req.query;
//     const limitValue = parseInt(limit) || 12;
  
//     try {
//       const categories = [
//         "automotive", "beauty", "electronics", "fashion", "groceries",
//         "health", "homes", "office", "pet", "school", "sports", "toys"
//       ];
  
//       const productPromises = categories.map(category =>
//         Product.find({ category })
//           .limit(limitValue)
//           .exec()
//       );
  
//       // Wait for all category fetches to complete
//       const productsByCategory = await Promise.all(productPromises);
  
//       // Send the fetched products for each category
//       const response = categories.map((category, index) => ({
//         category,
//         products: productsByCategory[index]
//       }));
  
//       res.json(response);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching products" });
//     }
//   });
  

