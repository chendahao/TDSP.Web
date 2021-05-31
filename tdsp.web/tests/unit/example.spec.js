import { shallowMount } from '@vue/test-utils'
import home from '@/components/Homeindex'

describe('home.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(home, {
      stubs: ['router-link', 'v-container', 'v-layout', 'v-flex', 'v-img']
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
