import { createElement } from 'lwc';
import WireCPR from 'c/wireCPR';
import { CurrentPageReference } from 'lightning/navigation';
import { registerTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
  
// Mock realistic data
const mockCurrentPageReference = require('./data/CurrentPageReference.json');
  
// Register a standard test wire adapter.
const currentPageReferenceAdapter = registerTestWireAdapter( //This allows us to mock it later in the test.
  CurrentPageReference
);
  
describe('c-wire-c-p-r', () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });
  
  it('renders the current page reference in <pre> tag', () => {
    const element = createElement('c-wire-c-p-r', {
      is: WireCPR
    });
    document.body.appendChild(element);
  
    // Select element for validation
    const preElement = element.shadowRoot.querySelector('pre');
    expect(preElement).not.toBeNull();
  
    // Emit data from @wire
    currentPageReferenceAdapter.emit(mockCurrentPageReference); //we populate the mock data using emit().
  
    return Promise.resolve().then(() => { //starts the Promise that expects the mock data to be updated into the preElement
      expect(preElement.textContent).toBe(
        JSON.stringify(mockCurrentPageReference, null, 2)
      );
    });
  });
});