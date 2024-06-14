/* eslint-disable @next/next/no-img-element */
"use client";
import { useCompletedLesson, useFirestoreUser } from "@/lib/firebase.hooks";
import { Checkbox } from "@/components/ui/checkbox";
import { LessonQueryResult, LessonsInCourseQueryResult } from "@/sanity.types";
import { useToast } from "@/components/ui/use-toast";
import { CheckedState } from "@radix-ui/react-checkbox";

export default function LessonComplete({
  lesson,
  course,
  showText = true,
}: {
  lesson: NonNullable<LessonQueryResult>;
  course: NonNullable<LessonsInCourseQueryResult>;
  showText?: boolean;
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
            checked={completeLesson ? true : false}
            onCheckedChange={makeComplete}
          />
          {showText && <p>Complete</p>}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
