import { ReactNode } from 'react'

/* eslint-disable jsx-a11y/label-has-associated-control */
function FilterModal({ children }: { children: ReactNode }) {
  return (
    <>
      <label htmlFor="my-modal-3" className="btn btn-sm  btn-secondary">
        Filter
      </label>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-warning absolute right-2 top-2"
          >
            ✕
          </label>
          {children}
        </div>
      </div>
    </>
  )
}

export default FilterModal
