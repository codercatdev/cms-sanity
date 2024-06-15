import {
  onAuthStateChanged,
  getAuth,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  onSnapshot,
  doc,
  collection,
  getFirestore,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { app } from "@/lib/firebase";
import { User } from "./firebase.types";
import {
  LessonQueryResult,
  LessonsInCourseQueryResult,
  PageQueryResult,
} from "@/sanity.types";
import { usePathname } from "next/navigation";
import { BaseBookmarkContent, BookmarkPath } from "@/lib/types";

export function useFirestoreUser() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(app), async (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!currentUser?.uid) return;
    const unsub = onSnapshot(
      doc(collection(getFirestore(), "users"), currentUser?.uid),
      (doc) => {
        setUser(doc.data() as User | undefined);
      }
    );
    return () => unsub();
  }, [currentUser]);

  return { currentUser, user };
}

export function useCompletedLesson({
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
  const [completeLesson, setCompleteLesson] = useState<LessonQueryResult>(null);

  const courseRef = doc(
    getFirestore(),
    "users/" + currentUser?.uid + "/completed/" + course._id
  );

  const lessonRef = doc(
    getFirestore(),
    "users/" +
      currentUser?.uid +
      "/completed/" +
      course._id +
      "/lesson/" +
      lesson._id
  );

  useEffect(() => {
    if (!currentUser?.uid || !lesson || !course) return;
    const unsub = onSnapshot(lessonRef, (doc) => {
      setCompleteLesson(doc.data() as LessonQueryResult);
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const addComplete = async () => {
    await setDoc(courseRef, course, { merge: true });
    await setDoc(lessonRef, lesson, { merge: true });
  };

  const removeComplete = async () => {
    await deleteDoc(lessonRef);
  };

  return { completeLesson, addComplete, removeComplete };
}

export function useBookmarked({ content }: { content: BaseBookmarkContent }) {
  const { currentUser } = useFirestoreUser();
  const [bookmarked, setBookmarked] = useState<BookmarkPath | undefined>(
    undefined
  );
  const pathname = usePathname();

  const contentRef = doc(
    getFirestore(),
    "users/" + currentUser?.uid + "/bookmarked/" + content._id
  );

  useEffect(() => {
    if (!currentUser?.uid || !content) return;
    const unsub = onSnapshot(contentRef, (doc) => {
      const base = doc.data() as BookmarkPath;
      setBookmarked(base);
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const addBookmark = async () => {
    await setDoc(
      contentRef,
      {
        ...content,
        pathname,
      },
      { merge: true }
    );
  };

  const removeBookmark = async () => {
    await deleteDoc(contentRef);
  };

  return { bookmarked, addBookmark, removeBookmark };
}
