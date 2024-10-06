import { create } from 'zustand'

interface AppState {
	selectedEmoji: string
}

const store = create<AppState>((set) => ({
	selectedEmoji: '',
	setSelectedEmoji: (emoji: string) => set(() => ({ selectedEmoji: emoji })),
}))

const useStore = () => {
	return {
		getStoreState: store.getState,
		setStoreState: store.setState,
	}
}

export default useStore
