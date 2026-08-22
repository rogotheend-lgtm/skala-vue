<script setup>
import SampleOne from './components/practice/basic/SampleOne.vue'
import SampleTwo from './components/practice/basic/SampleTwo.vue'
import VueBind from './components/practice/basic/VueBind.vue'
import VueBindClass from './components/practice/basic/VueBindClass.vue'
import VueBindShorthand from './components/practice/basic/VueBindShorthand.vue'
import VueBindStyle from './components/practice/basic/VueBindStyle.vue'
import VueCloak from './components/practice/basic/VueCloak.vue'
import VueFor from './components/practice/basic/VueFor.vue'
import VueHtml from './components/practice/basic/VueHtml.vue'
import VueHtmlXss from './components/practice/basic/VueHtmlXss.vue'
import VueIf from './components/practice/basic/VueIf.vue'
import VueMemo from './components/practice/basic/VueMemo.vue'
import VueOnce from './components/practice/basic/VueOnce.vue'
import VuePre from './components/practice/basic/VuePre.vue'
import VueText from './components/practice/basic/VueText.vue'
import EventBasic from './components/practice/basic/EventBasic.vue'
import EventObject from './components/practice/basic/EventObject.vue'
import EventModifier from './components/practice/basic/EventModifier.vue'
import ModelBasic from './components/practice/basic/ModelBasic.vue'
import ModelFrom from './components/practice/basic/ModelFrom.vue'
import ModelModifier from './components/practice/basic/ModelModifier.vue'
import VueStyle from './components/practice/basic/VueStyle.vue'
import VueRef from './components/practice/basic/VueRef.vue'
import VueReactive from './components/practice/basic/VueReactive.vue'
import ComputedBasic from './components/composition/ComputedBasic.vue'
import WatchersBasic from './components/composition/WatchersBasic.vue'
import WatchersMulti from './components/composition/WatchersMulti.vue'
import WatchersDeep from './components/composition/WatchersDeep.vue'
import WatchersWatchEffect from './components/composition/WatchersWatchEffect.vue'
import LifecycleChild from './components/practice/component/LifecycleChild.vue'
import LifecycleParent from './components/practice/component/LifecycleParent.vue'
import PropsEmitsChild from './components/practice/component/PropsEmitsChild.vue'
import PropsEmitsParent from './components/practice/component/PropsEmitsParent.vue'
import SlotDefaultParent from './components/practice/component/SlotDefaultParent.vue'
import SlotNamedParent from './components/practice/component/SlotNamedParent.vue'
import SlotScopedParent from './components/practice/component/SlotScopedParent.vue'


</script>

<template>
  <main class="practice-list">
    <h1>Vue 기초 예제</h1>
    <SampleOne />
    <SampleTwo />
    <VueHtml />
    <VueHtmlXss />
    <VueText />
    <VueBind />
    <VueBindClass />
    <VueBindStyle />
    <VueBindShorthand />
    <VueIf />
    <VueShow />
    <VueFor />
    <VuePre />
    <VueCloak />
    <VueOnce />
    <VueMemo />
    <EventBasic />
    <EventObject />
    <EventModifier />
    <ModelBasic />
    <ModelFrom />
    <ModelModifier/>
    <VueStyle />
    <VueRef />
    <VueReactive />    
    <ComputedBasic />
    <WatchersBasic />
    <WatchersMulti />
    <WatchersDeep />
    <WatchersWatchEffect/>
    <LifecycleChild />
    <LifecycleParent />
    <PropsEmitsChild />
    <PropsEmitsParent />
    <SlotDefaultParent />
    <SlotNamedParent />
    <SlotScopedParent />
    
  </main>
</template>

<style>
:root {
  --practice-bg: #0b1120;
  --practice-surface: #151f32;
  --practice-surface-hover: #1b2940;
  --practice-border: #2d3b52;
  --practice-text: #e6edf7;
  --practice-muted: #9aa9bd;
  --practice-primary: #42b883;
  --practice-primary-hover: #55c995;
  --practice-danger: #fb7185;
}

body {
  min-width: 320px;
  min-height: 100vh;
  color: var(--practice-text);
  background:
    radial-gradient(circle at top, rgb(66 184 131 / 10%), transparent 32rem),
    var(--practice-bg);
}

#app {
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 48px 24px;
}

.practice-list {
  width: 100%;
}

.practice-list > h1 {
  margin: 0 0 32px;
  color: var(--practice-text);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.04em;
}

.practice-list .practice-section {
  margin-bottom: 24px;
  padding: 24px;
  color: var(--practice-text);
  background: linear-gradient(145deg, var(--practice-surface), #101827);
  border: 1px solid var(--practice-border);
  border-radius: 14px;
  box-shadow: 0 12px 30px rgb(0 0 0 / 22%);
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    background-color 0.2s ease;
}

.practice-list .practice-section:hover {
  background-color: var(--practice-surface-hover);
  border-color: rgb(66 184 131 / 65%);
  transform: translateY(-2px);
}

.practice-list .practice-section h2 {
  margin: 0 0 18px;
  color: var(--practice-primary);
  font-size: 1.4rem;
  font-weight: 750;
}

.practice-list .practice-section h3 {
  margin: 20px 0 8px;
  color: var(--practice-text);
  font-size: 1rem;
  font-weight: 650;
}

.practice-list .practice-section p,
.practice-list .practice-section label,
.practice-list .practice-section li {
  color: var(--practice-muted);
}

.practice-list .practice-section strong {
  color: var(--practice-text);
  font-weight: 700;
}

.practice-list button {
  margin: 8px 6px 0 0;
  padding: 9px 14px;
  color: #062519;
  font: inherit;
  font-weight: 700;
  background: var(--practice-primary);
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.practice-list button:hover:not(:disabled) {
  background: var(--practice-primary-hover);
  box-shadow: 0 6px 16px rgb(66 184 131 / 22%);
  transform: translateY(-1px);
}

.practice-list button:disabled {
  color: #718096;
  background: #273449;
  border-color: var(--practice-border);
  cursor: not-allowed;
}

.practice-list input,
.practice-list select,
.practice-list textarea {
  max-width: 100%;
  margin: 6px 4px;
  padding: 9px 11px;
  color: var(--practice-text);
  font: inherit;
  background: #0c1424;
  border: 1px solid var(--practice-border);
  border-radius: 8px;
  outline: none;
}

.practice-list input:focus,
.practice-list select:focus,
.practice-list textarea:focus {
  border-color: var(--practice-primary);
  box-shadow: 0 0 0 3px rgb(66 184 131 / 15%);
}

.practice-list a {
  color: #5eead4;
}

.practice-list hr {
  margin: 24px 0;
  border: 0;
  border-top: 1px solid var(--practice-border);
}

@media (max-width: 640px) {
  #app {
    padding: 28px 14px;
  }

  .practice-list .practice-section {
    padding: 18px;
  }
}
</style>
