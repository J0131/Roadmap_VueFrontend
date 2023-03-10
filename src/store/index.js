import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        curLon: undefined,
        curLat: undefined,
        reviews: undefined,
        curReviewId: undefined,
        curAddress: undefined,
        curTitle: undefined,
        curGrade: undefined,
        curReview: undefined,
        isDisabledInput: undefined
    },
    mutations: {
        setInputState: (state, bool) => {
            state.isDisabledInput = bool
        },
        setCurReviewId: (state, id) => {
            state.curReviewId = id
        },
        setCurTitle: (state, title) => {
            state.curTitle = title
        },
        setCurAddress: (state, address) => {
            state.curAddress = address
        },
        setCurGrade: (state, grade) => {
            state.curGrade = grade
        },
        setCurReview: (state, review) => {
            state.curReview = review
        },
        setReviews: (state, reviews) => {
            if (state.reviews && reviews
                && state.reviews.length !== reviews.length) {
                    const ids = state.reviews.map(re=>re.id)
                    const curReview = reviews.find(review => !ids.includes(review.id))
                    if(curReview)
                        state.curReviewId = curReview.id
            }
            state.reviews = reviews
            state.isDisabledInput = false

            const review = reviews.find(review =>  
                review.id === state.curReviewId
            )

            setReview(state, review)
        },
        setReview: (state, review) => {
            setReview(state, review)
        },
    },
    actions: {
        async setReviews({commit}) {
            const result = await axios.get('/api/review/getReviews')
            await commit('setReviews', result.data)
        }
    },
    modules: {}
})

function setReview(state, review) {
    state.curReviewId = review ? review.id : review;
    state.curLat = review ? review.lat : review;
    state.curLon = review ? review.lon : review;
    state.curTitle = review ? review.title : review;
    state.curGrade = review ? review.grade : review;
    state.curAddress = review ? review.address : review;
    state.curReview = review ? review.review : review;
}