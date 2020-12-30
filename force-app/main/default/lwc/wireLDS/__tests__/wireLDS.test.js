import { createElement } from 'lwc';
import WireLDS from 'c/wireLDS';
import { getRecord } from 'lightning/uiRecordApi'; //getRecord is coming from the LDS API.
import { registerLdsTestWireAdapter } from '@salesforce/sfdx-lwc-jest'; //registerLdsTestWireAdapter is the specific Jest adapter for working with LDS.
  
// Mock realistic data
const mockGetRecord = require('./data/getRecord.json'); //is mocking the data from the getRecord.json file in the data directory.
  
// Register as an LDS wire adapter
const getRecordAdapter = registerLdsTestWireAdapter(getRecord); // registers the LDS wire adapter with getRecord
  
describe('c-wire-l-d-s', () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });
  
  describe('getRecord @wire data', () => {
    it('renders contact details', () => {
      const element = createElement('c-wire-l-d-s', {
        is: WireLDS
      });
      document.body.appendChild(element);
  
      // Emit data from @wire
      getRecordAdapter.emit(mockGetRecord); // uses the emit method on getRecordAdapter with the mockGetRecord as an argument.
  
      return Promise.resolve().then(() => { // starts the Promise return and we check that various elements are updated with the mock data. 
        // Select elements for validation
        const nameElement = element.shadowRoot.querySelector('p.accountName');
        expect(nameElement.textContent).toBe(
          'Account Name: ' + mockGetRecord.fields.Name.value
        );
  
        const industryElement = element.shadowRoot.querySelector('p.accountIndustry');
        expect(industryElement.textContent).toBe(
          'Industry: ' + mockGetRecord.fields.Industry.value
        );
  
        const phoneElement = element.shadowRoot.querySelector('p.accountPhone');
        expect(phoneElement.textContent).toBe(
          'Phone: ' + mockGetRecord.fields.Phone.value
        );
  
        const ownerElement = element.shadowRoot.querySelector('p.accountOwner');
        expect(ownerElement.textContent).toBe(
          'Owner: ' + mockGetRecord.fields.Owner.displayValue
        );
      });
    });
  });

  describe('getRecord @wire error', () => {
    it('shows error message', () => {
      const element = createElement('c-wire-l-d-s', {
        is: WireLDS
      });
      document.body.appendChild(element);
  
      // Emit error from @wire
      getRecordAdapter.error();
  
      return Promise.resolve().then(() => {
        const errorElement = element.shadowRoot.querySelector('p');
        expect(errorElement).not.toBeNull();
        expect(errorElement.textContent).toBe('No account found.');
      });
    });
  });
});