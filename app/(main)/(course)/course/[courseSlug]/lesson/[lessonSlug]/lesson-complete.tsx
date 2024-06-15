"use client";
import { useCompletedLesson, useFirestoreUser } from "@/lib/firebase.hooks";
import { Checkbox } from "@/components/ui/checkbox";
import { LessonQueryResult, LessonsInCourseQueryResult } from "@/sanity.types";
import { useToast } from "@/components/ui/use-toast";
import { CheckedState } from "@radix-ui/react-checkbox";

export default function LessonComplete({
  lesson,
  course,
}: {
  lesson: NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<LessonsInCourseQueryResult>["sections"]
      >[0]["lesson"]
    >[0]
  >;
  course: NonNullable<LessonsInCourseQueryResult>;
}) {
  const { currentUser } = useFirestoreUser();
  const { completeLesson, addComplete, removeComplete } = useCompletedLesson({
    lesson,
    course,
  });
  const { toast } = useToast();

  const makeComplete = async (isChecked: CheckedState) => {
    if (!currentUser?.uid) {
      toast({
        variant: "destructive",
        description: "You must be logged in to complete a lesson.",
      });
      return;
    }
    if (isChecked) {
      await addComplete();
      toast({
        description: "What a rockstar! 🎉",
      });
    } else {
      await removeComplete();
    }
  };
  return (
    <>
      {currentUser?.uid ? (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={completeLesson?._id ? true : false}
            onCheckedChange={makeComplete}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
