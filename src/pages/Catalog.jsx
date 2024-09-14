import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import Course_Slider from "../components/core/Catalog/Course_Slider";
import { useParams } from "react-router-dom";
import { apiconnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponntDatas";
import Course_Card from "../components/core/Catalog/Course_Card";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(1);

  useEffect(() => {
    const getCategory = async () => {
      const res = await apiconnector("GET", categories.CATEGORIES_API);
      const category_id = res?.data?.allCategorys?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(category_id);
    };

    getCategory();
  }, [catalogName]);

  //   console.log("CATEGORYID----", categoryId);

  useEffect(() => {
    if (categoryId) {
      (async () => {
        try {
          const res = await getCatalogPageData(categoryId);
          setCatalogPageData(res);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [categoryId]);

  //   console.log(catalogPageData);
  return (
    <>
    {/* Hero Section */}
    <div className=" box-content bg-richblack-800 px-4">
      <div className="mx-auto flex min-h-[260px] max-w-[650px] flex-col justify-center gap-4 lg:max-w-[1260px] ">
        <p className="text-sm text-richblack-300">
          {`Home / Catalog / `}
          <span className="text-yellow-25">
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </p>
        <p className="text-3xl text-richblack-5">
          {catalogPageData?.data?.selectedCategory?.name}
        </p>
        <p className="max-w-[870px] text-richblack-200">
          {catalogPageData?.data?.selectedCategory?.description}
        </p>
      </div>    
    </div>

    {/* Section 1 */}
    <div className=" mx-auto box-content w-full max-w-[650px] px-4 py-12 lg:max-w-[1260px]">
      <div className="section_heading">Courses to get you started</div>
      <div className="my-4 flex border-b border-b-richblack-600 text-sm">
        <p
          className={`px-4 py-2 ${
            active === 1
              ? "border-b border-b-yellow-25 text-yellow-25"
              : "text-richblack-50"
          } cursor-pointer`}
          onClick={() => setActive(1)}
        >
          Most Populer
        </p>
        <p
          className={`px-4 py-2 ${
            active === 2
              ? "border-b border-b-yellow-25 text-yellow-25"
              : "text-richblack-50"
          } cursor-pointer`}
          onClick={() => setActive(2)}
        >
          New
        </p>
      </div>
      <div className="" >
        <Course_Slider
          Courses={catalogPageData?.data?.selectedCategory?.courses}
        />
      </div>
    </div>
    {/* Section 2 */}
    <div className=" mx-auto box-content w-full max-w-[650px] px-4 py-12 lg:max-w-[1260px]">
      <div className="section_heading">
        Top courses in {catalogPageData?.data?.differentCategory?.name}
      </div>
      <div className="py-8">
        <Course_Slider
          Courses={catalogPageData?.data?.differentCategory?.courses}
        />
      </div>
    </div>

    {/* Section 3 */}
    <div className=" mx-auto box-content w-full max-w-[650px] px-4 py-12 lg:max-w-[1260px]">
      <div className="section_heading">Frequently Bought</div>
      <div className="py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {catalogPageData?.data?.mostSellingCourses
            ?.slice(0, 4)
            .map((course, i) => (
              <Course_Card course={course} key={i} Height={"h-[400px]"} />
            ))}
        </div>
      </div>
    </div>

    <Footer />
  </>
  );
};

export default Catalog;
