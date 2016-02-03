// in production use a faux debug function
const debug = __PROD__ ? () => ({}) : require('debug/browser')

debug.enable('app:*')

// Namespaced debugger
// import {makeDebugger} from 'utils/debug'
// const debug = makeDebugger('app:namespace')
//
// debug('Some message')
export const makeDebugger = debug


// Simple log
// import debug from 'utils/debug'
// debug('Some message')
export default debug('app:log')
