import GameStatus from '@/components/GameStatus.vue';
import { shallowMount } from '@vue/test-utils';

describe('GameStatus.vue', () => {
    it.skip('renders props.msg when passed', () => {
        const msg = 'new message';
        const wrapper = shallowMount(GameStatus, {
            propsData: { msg },
        });
        expect(wrapper.text()).toMatch(msg);
    });
});
