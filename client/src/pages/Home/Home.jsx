import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';

import Card2 from '../../components/product/Card2';

const Home = () => {
  const { products, getMoreProducts, productsIsLoading, productsError, filteredProducts, filteredisLoading, filteredProductsError, moreProductsIsLoading, moreProductsError} = useContext(ProductContext);
  return (
      <div className="flex flex-col gap-6">
          {productsError ? <div className={`text-center text-xl text-gray-500 ${"bg-red-800"}`}>{productsError}</div> : 
            filteredProductsError ? <div className={`text-center text-xl text-gray-500 ${"bg-red-800"}`}>{filteredProductsError}</div> :
            productsIsLoading || filteredisLoading ? (
              <div className="text-center text-xl text-gray-500">Loading...</div>
          ) : filteredProducts?.length > 0 ? (
            
            <Card2 products={filteredProducts} error={productsError} isLoading={productsIsLoading} />
          ) 
          : (
              products.map((object, index) => (
                  <div key={index} className="flex flex-col">
                      {/* Category Name */}
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                          {object.category}
                      </h2>

                      {/* Products in the category */}
                      <div className="flex flex-col lg:flex-row space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2">
                          <Card2 products={object.products} error={productsError} isLoading={productsIsLoading} />
                          <div 
                                onClick={() => getMoreProducts(object.category, index)}
                                className={`px-6 py-2 bg-slate-700 text-white text-base font-medium rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900 items-center flex ${moreProductsIsLoading ? 'cursor-not-allowed bg-slate-700' : moreProductsError ? 'bg-red-800 cursor-pointer' : 'bg-slate-700 cursor-pointer'}`}>
                                    <span className="text-sm mt-2">{moreProductsIsLoading ? "Loading" : "Load More"}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                    
                          </div>
                      </div>
                  </div>
              ))
          )}
      </div>
  );
};

export default Home;