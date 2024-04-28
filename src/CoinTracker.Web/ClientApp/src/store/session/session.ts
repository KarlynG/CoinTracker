import { User } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../../auth/firebase";
import userService from "../../services/users/user.service";
export type FirebaseUser = {
  firebaseUser: User | null;
  hasAnimated: boolean;
  isLoading: boolean;
};
export type FirebaseUserActions = {
  setUser: (user: User | null) => void;
  logOutUser: () => void;
  setHasAnimated: () => void;
  setIsLoading: () => void;
};
export const useUserStore = create<FirebaseUser & FirebaseUserActions>(
  (set) => ({
    firebaseUser: null,
    hasAnimated: false,
    isLoading: true,
    setUser: (user) =>
      set(() => {
        if (user) {
          user
            .getIdToken()
            .then((token) => {
              localStorage.setItem("token", token);
            })
            .finally(() => {
              userService.getById(user.uid).catch((result) => {
                if (result.response.status === 404) {
                  userService.create({
                    firebaseId: user.uid,
                    name: user.displayName!,
                    lastName: undefined,
                    id: undefined,
                    totalSpentEver: undefined,
                    totalSpentMonth: undefined,
                    totalSpentYear: undefined,
                  });
                }
              });
            });
        }
        return { firebaseUser: user };
      }),
    logOutUser: () =>
      set(() => {
        auth.signOut();
        return { firebaseUser: null };
      }),
    setHasAnimated: () => set(() => ({ hasAnimated: true })),
    setIsLoading: () => set(() => ({ isLoading: false })),
  })
);
