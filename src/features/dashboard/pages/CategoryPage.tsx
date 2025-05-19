import { Layers2  } from "lucide-react"
import { Fragment } from "react/jsx-runtime"
import { Toaster } from "sonner"
import styles from '@/features/dashboard/styles/category.module.css'
import CategoryTable from "../components/category/CategoryTable"
import { useCategory } from "../hooks/useCategory"
import { CategoryDialog } from "../components/category/CategoryDialog"

const CategoryPage = () => {

    const { loading, category, totalCategory } = useCategory()

    return (
        <Fragment>
            <Toaster/>
            <div className="size-full">
                <div className="">
                    <div className="text-2xl font-semibold">Overview</div>
                    <div className="">This is the page where your category is summarized.</div>
                </div>

                <div className="grid grid-cols-12 mt-4 gap-3">
                    <div className="h-[9rem] col-span-12 md:col-span-3 bg-amber-50 rounded-2xl p-4">
                        <div className="flex items-center gap-2"><Layers2 />Category</div>
                        <div className="font-semibold text-5xl mt-5 text-center">{ totalCategory }</div>
                    </div>
                    <div className={`h-[9rem] col-span-12 md:col-span-9 bg-gray-50 flex flex-col justify-center rounded-2xl p-4 ${styles.gradient}`}>
                        <div className="text-3xl font-semibold">Travelio.</div>
                        <div className="text-gray-500">Category management</div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-2xl mt-3 h-full w-full p-4">
                    <CategoryTable category={category}></CategoryTable>
                </div>
            </div>
            <CategoryDialog/>
        </Fragment>
    )
}

export default CategoryPage