'use client';
export default ({ error }: { error: Error }) => <div>
    {error.message}
</div>