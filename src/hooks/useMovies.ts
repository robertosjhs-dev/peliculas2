import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  getDocs
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { handleFirestoreError } from '../lib/errorHandler';
import { OperationType, type Movie } from '../types';

export const useMovies = (onlyUserMovies = false) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const moviesRef = collection(db, 'movies');
    let q = query(moviesRef, orderBy('createdAt', 'desc'));

    if (onlyUserMovies && auth.currentUser) {
      q = query(moviesRef, where('creatorId', '==', auth.currentUser.uid), orderBy('createdAt', 'desc'));
    }

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const moviesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Movie));
        setMovies(moviesData);
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'movies');
      }
    );

    return unsubscribe;
  }, [onlyUserMovies]);

  const createMovie = async (movieData: Partial<Movie>) => {
    if (!auth.currentUser) return;
    try {
      const docRef = await addDoc(collection(db, 'movies'), {
        ...movieData,
        creatorId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'movies');
    }
  };

  const updateMovie = async (movieId: string, movieData: Partial<Movie>) => {
    try {
      const movieRef = doc(db, 'movies', movieId);
      await updateDoc(movieRef, {
        ...movieData,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `movies/${movieId}`);
    }
  };

  const deleteMovie = async (movieId: string) => {
    try {
      await deleteDoc(doc(db, 'movies', movieId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `movies/${movieId}`);
    }
  };

  return { movies, loading, createMovie, updateMovie, deleteMovie };
};

export const useAdminData = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalMovies: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const userSnap = await getDocs(collection(db, 'users'));
        const movieSnap = await getDocs(collection(db, 'movies'));
        
        setUsers(userSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setStats({
          totalUsers: userSnap.size,
          totalMovies: movieSnap.size
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'admin_collections');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  return { users, stats, loading };
};
