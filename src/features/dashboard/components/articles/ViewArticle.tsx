import type { Article } from "../../models/articles/state";
import { useAppDispatch, useAppSelector } from "@/app/stores";
import { useArticleDialog } from "../../hooks/useArticleDialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import { showArticleDialog } from "../../store/articles/articlesSlice";
import { Separator } from "@/app/components/ui/separator";

export type ViewArticleProps = {
    open: boolean,
    article: Article
}

export const ViewArticle = () => {

    const { } = useArticleDialog()
    const dispatch = useAppDispatch()
    const { showDialog } = useAppSelector((state) => state.article)

    return (
        <Dialog
            open={showDialog.type === 'View' && showDialog.data !== null}
            onOpenChange={(open) => !open && dispatch(showArticleDialog({ type: null, article: null }))}
        >
            <DialogContent className="min-w-[90vw] h-[50rem]">
                <DialogTitle>
                    View Article
                </DialogTitle>
                <div className="grid grid-cols-6 gap-1 m-5">
                    <div className="col-span-4 overflow-y-scroll h-[42rem] pr-5 thin-scrollbar">
                        <img
                            src={showDialog.data?.cover_image_url}
                            className="w-full h-[25rem] rounded-2xl object-cover"
                        />
                        <div className="text-3xl my-5 font-semibold min-h-10 h-auto">{showDialog.data?.title ?? "-"}</div>
                        <div className="text-lg mb-5 font-normal min-h-10 h-auto">{showDialog.data?.description ?? ""}</div>
                    </div>

                    <div className="col-span-2 overflow-y-auto h-[42rem] bg-gray-100 p-4 rounded-2xl thin-scrollbar">
                        <div className="text-lg font-semibold mb-2">Comments {showDialog.data?.comments.length ?? 0}</div>
                        <div className="space-y-4">
                            {
                                !showDialog.data?.comments || showDialog.data.comments.length === 0 ? (
                                    <div>No Comments</div>
                                ) : (
                                    showDialog.data.comments.map((item, index) => (
                                        <div key={index} className="">
                                            <div className="font-semibold">{item.user.username}</div>
                                            <div className="">{item.content}</div>
                                            <Separator className="bg-gray-300"/>
                                        </div>
                                    ))
                                )
                            }

                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    );
}
