import { DialogHeader } from "@/app/components/ui/dialog"
import { useAppSelector, useAppDispatch } from "@/app/stores"
import { Dialog, DialogContent, DialogTitle } from "@/app/components/ui/dialog"
import { useArticleDialog } from "../../hooks/useArticleDialog"
import { FormCategoryInputDialog } from "./CategoryFormInputDialog"
import { setDialog } from "../../store/category/categorySlice"

export const CategoryDialog = () => {

    const {} = useArticleDialog()
    const { showDialog } = useAppSelector((state) => state.category)
    const dispatch = useAppDispatch()

    return (
        <Dialog open={showDialog.type === 'Create' || showDialog.type === 'Edit'} onOpenChange={(open) => !open && dispatch(setDialog({ category: null, type: null }))}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {showDialog.type} Category
                    </DialogTitle>
                </DialogHeader>
                <div className="w-full">
                    <FormCategoryInputDialog 
                        categoryItem={showDialog.category} 
                        mode={showDialog.type}
                        close={() => dispatch(setDialog({ type: null, category: null }))}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}