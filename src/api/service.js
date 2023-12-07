import {
    doc,
    updateDoc,
    getDoc,
    getDocs,
    setDoc,
    collection,
    query,
    where,
} from "firebase/firestore"
import { auth, db } from "../config/firebase"

class Service {
    async addUser(userId, userEmail) {
        const docRef = doc(db, "users", userId)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            // If the user is not already in the db, create a new document
            await setDoc(docRef, {
                email: userEmail,
            })
        }
    }

    getUserDocRef() {
        const userId = auth?.currentUser?.uid
        if (!userId) {
            throw new Error("User not authenticated")
        }
        return doc(db, "users", userId)
    }

    async userExist(userEmail) {
        const usersRef = collection(db, "users")
        const querySnapshot = await getDocs(
            query(usersRef, where("email", "==", userEmail))
        )

        return !querySnapshot.empty
    }

    async getCategories() {
        try {
            const userDocRef = this.getUserDocRef()
            const response = await getDoc(userDocRef)
            const categories = response.data()?.categories
            if (categories) {
                return categories
            }
            return []
        } catch (error) {
            console.log(error)
        }
    }

    async getTasks() {
        try {
            const userDocRef = this.getUserDocRef()
            const response = await getDoc(userDocRef)
            const tasks = response.data()?.tasks
            if (tasks) {
                return tasks
            }
            return []
        } catch (error) {
            console.log(error)
        }
    }

    async addCategory(category) {
        try {
            const userDocRef = this.getUserDocRef()
            const categories = await this.getCategories()
            await updateDoc(userDocRef, {
                categories: [...categories, category],
            })
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCategory(categoryToDelete) {
        try {
            const userDocRef = this.getUserDocRef()
            const categories = await this.getCategories()
            const tasks = await this.getTasks()

            const updatedCategories = categories?.filter(
                (category) => category?.id !== categoryToDelete?.id
            )

            const updatedTasks = tasks?.filter(
                // delete each task that has that category
                (task) => task.category?.id !== categoryToDelete?.id
            )

            await updateDoc(userDocRef, {
                categories: updatedCategories,
                tasks: updatedTasks,
            })
        } catch (error) {
            console.log(error)
        }
    }

    async addTask(task) {
        try {
            const userDocRef = this.getUserDocRef()
            const tasks = await this.getTasks()
            await updateDoc(userDocRef, {
                tasks: [...tasks, task],
            })
        } catch (error) {
            console.log(error)
        }
    }
}

const service = new Service()

export default service
