import { DialogHeader } from "@/app/components/ui/dialog"
import { useAppSelector, useAppDispatch } from "@/app/stores"
import { Dialog, DialogContent, DialogTitle, } from "@/app/components/ui/dialog"
import { useArticleDialog } from "../../hooks/useArticleDialog"
import { showArticleDialog } from "../../store/articles/articlesSlice"
import { FormInputDialog } from "./FormInputDialog"

export const ArticleRowActions = () => {

    const {} = useArticleDialog()
    const { showDialog } = useAppSelector((state) => state.article)
    const dispatch = useAppDispatch()

    return (
        <Dialog open={showDialog.type === 'Create' || showDialog.type === 'Edit'} onOpenChange={(open) => !open && dispatch(showArticleDialog({ article: null, type: null }))}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {showDialog.type} Article
                    </DialogTitle>
                </DialogHeader>
                <div className="w-full">
                    <FormInputDialog 
                        article={showDialog.data} 
                        mode={showDialog.type}
                        close={() => dispatch(showArticleDialog({ type: null, article: null }))}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}