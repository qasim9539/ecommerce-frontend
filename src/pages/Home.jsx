import React from 'react';
import banner from '../assets/banner2.webp';
import bannerMobile from '../assets/banner-mobile.jpg';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import { Link, useNavigate } from 'react-router-dom';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => c._id === id);
      return filterData ? true : null;
    });

    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
    navigate(url);
  };

  return (
    <section className="bg-white">
      {/* Banner Section */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 mb-6">
        <img
          src={banner}
          className="w-full h-full object-cover hidden lg:block rounded-xl"
          alt="banner"
        />
        <img
          src={bannerMobile}
          className="w-full h-full object-cover lg:hidden rounded-xl"
          alt="banner-mobile"
        />
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {loadingCategory
          ? new Array(12).fill(null).map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-lg p-4 min-h-[150px] flex flex-col items-center justify-center shadow animate-pulse"
              ></div>
            ))
          : categoryData.map((cat) => (
              <div
                key={cat._id}
                className="flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-md cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-34 h-34 object-contain mb-2"
                />
                <h1 className="text-sm font-semibold text-gray-800 text-center">
                  {cat.name}
                </h1>
              </div>
            ))}
      </div>

      {/* Category-Wise Products */}
      <div className="mt-10">
        {categoryData?.map((c) => (
          <CategoryWiseProductDisplay
            key={c?._id}
            id={c?._id}
            name={c?.name}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;