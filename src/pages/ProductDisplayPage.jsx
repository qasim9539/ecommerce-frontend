import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import Divider from "../components/Divider";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "../components/AddToCartButton";
import { Box, Grid, LinearProgress, Rating } from "@mui/material";
import ProductReviewCard from "../components/ProductReviewCard";

const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params?.product?.split("-")?.slice(-1)[0];

  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [reviews, setReviews] = useState([]);
  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await Axios({
        method: 'GET',
        url: `/api/review/product/${productId}`,
      });

      if (response.data.success) {
        setReviews(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
    fetchReviews();
  }, [productId]);

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  return (
    <section className="container mx-auto p-6 grid lg:grid-cols-2 gap-8 bg-gray-50 rounded-2xl shadow-lg">
      {/* Product Image Section */}
      <div>
        <div className="bg-white lg:min-h-[80vh] lg:max-h-[80vh] rounded-xl overflow-hidden shadow">
          <img
            src={data.image[image]}
            alt="Product"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Image Indicator Dots */}
        <div className="flex items-center justify-center gap-3 my-4">
          {data.image.map((img, index) => (
            <div
              key={`${img}-${index}`}
              className={`w-4 h-4 lg:w-6 lg:h-6 rounded-full transition-all ${index === image
                  ? "bg-green-500"
                  : "bg-gray-300 hover:bg-gray-400"
                }`}
            ></div>
          ))}
        </div>

        {/* Image Thumbnails */}
        <div className="relative grid gap-4">
          <div
            ref={imageContainer}
            className="flex gap-4 overflow-x-auto scrollbar-none"
          >
            {data.image.map((img, index) => (
              <div
                key={`${img}-${index}`}
                className="w-20 h-20 cursor-pointer rounded-lg overflow-hidden shadow hover:ring-2 hover:ring-green-500 transition-all"
                onClick={() => setImage(index)}
              >
                <img
                  src={img}
                  alt="Thumbnail"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons for Thumbnails */}
          <div className="hidden lg:flex justify-between absolute w-full top-0 h-full items-center">
            <button
              onClick={handleScrollLeft}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {data.name}
        </h2>
        <p className="text-gray-600 mb-4">Unit: {data.unit}</p>

        <Divider className="my-4" />

        <div>
          <p className="font-medium text-gray-700 mb-2">Price</p>
          <div className="flex items-center gap-3">
            <div className="bg-green-100 border border-green-500 px-4 py-2 rounded-lg">
              <p className="font-semibold text-xl text-green-700">
                {DisplayPriceInRupees(
                  pricewithDiscount(data.price, data.discount)
                )}
              </p>
            </div>
            {data.discount && (
              <p className="line-through text-gray-500">
                {DisplayPriceInRupees(data.price)}
              </p>
            )}
            {data.discount && (
              <p className="text-lg font-bold text-green-600">
                {data.discount}%{" "}
                <span className="text-sm text-gray-500">Discount</span>
              </p>
            )}
          </div>
        </div>

        {/* Stock and Add to Cart */}
        {data.stock === 0 ? (
          <p className="text-lg text-red-500 mt-4">Out of Stock</p>
        ) : (
          <div className="mt-6">
            <AddToCartButton data={data} />
          </div>
        )}




        {/* Description Section */}
        <div className="mt-6 space-y-4">
          <div>
            <p className="font-semibold text-gray-800">Description</p>
            <p className="text-gray-600">{data.description}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Unit</p>
            <p className="text-gray-600">{data.unit}</p>
          </div>
          {data?.more_details &&
            Object.keys(data?.more_details).map((element, index) => (
              <div key={`${element}-${index}`}>
                <p className="font-semibold text-gray-800">{element}</p>
                <p className="text-gray-600">{data?.more_details[element]}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Ratings and Reviews Section */}
      <section className="bg-gray-50 p-6 rounded-2xl shadow-md lg:col-span-2 mt-8">
        <h1 className="font-bold text-xl text-gray-800 pb-4">
          Recent Reviews & Ratings
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reviews */}
          <div className="space-y-6">
            {loading ? (
              <p>Loading...</p>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300"
                >
                  <ProductReviewCard review={review} />

                </div>
              ))
            ) : (
              <p>No reviews yet for this product.</p>
            )}
          </div>

          {/* Ratings */}
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300">
            <h2 className="font-semibold text-lg text-gray-800 pb-4">
              Product Ratings
            </h2>
            <div className="flex items-center space-x-3 pb-6">
              <Rating precision={0.5} value={5} readOnly />
              <p className="text-sm text-gray-600">{data.ratings}</p>

            </div>

            <div className="space-y-4">
              {[
                { label: "Excellent", value: 80, color: "bg-green-500" },
                { label: "Very Good", value: 60, color: "bg-green-400" },
                { label: "Good", value: 40, color: "bg-yellow-400" },
                { label: "Average", value: 20, color: "bg-orange-400" },
                { label: "Poor", value: 10, color: "bg-red-500" },
              ].map((rating, index) => (
                <div key={index} className="flex items-center gap-4">
                  <p className="text-sm font-medium text-gray-700 w-20">
                    {rating.label}
                  </p>
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`${rating.color} h-full rounded-full`}
                      style={{ width: `${rating.value}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{rating.value}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProductDisplayPage;